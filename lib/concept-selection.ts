'use client'

// Kho "concept đã chọn" (F07) — lưu ở localStorage, đồng bộ giữa các component và các tab.
// Nếu trình duyệt chặn localStorage (chế độ ẩn danh...), vẫn chạy được trong bộ nhớ.
import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'nha-cuu:selected-concepts'
const CHANGE_EVENT = 'nha-cuu:selected-concepts-change'
const EMPTY: string[] = []

let memory: string[] = EMPTY
let cachedRaw: string | null | undefined
let cachedList: string[] = EMPTY

function readStorage(): string | null | undefined {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return undefined // không truy cập được localStorage
  }
}

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY
  try {
    const value: unknown = JSON.parse(raw)
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : EMPTY
  } catch {
    return EMPTY
  }
}

function getSnapshot(): string[] {
  const raw = readStorage()
  if (raw === undefined) return memory
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedList = parse(raw)
  }
  return cachedList
}

function getServerSnapshot(): string[] {
  return EMPTY
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange()
  }
  window.addEventListener('storage', onStorage)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

function write(list: string[]) {
  memory = list
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // giữ trong bộ nhớ
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function toggleConcept(slug: string) {
  const current = getSnapshot()
  write(current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug])
}

export function clearConcepts() {
  write([])
}

/** Danh sách slug concept đã chọn. Render phía server luôn là [] để không lệch hydration. */
export function useSelectedConcepts(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
