// Repository yêu cầu đặt lịch (REQUIREMENTS F11 — lưu trữ [GIẢ ĐỊNH]).
// Chỉ import từ code server (Server Action, trang admin). UI không biết dữ liệu nằm ở đâu (R4.5).
// Bản demo: ghi file JSON .data/bookings.json; nếu không ghi được (vd. host chỉ đọc) thì giữ trong bộ nhớ.
// Khi chạy thật: thay phần thân các hàm dưới bằng database, giữ nguyên chữ ký.
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import type { BookingRequest } from '@/types'

const FILE = path.join(process.cwd(), '.data', 'bookings.json')

let memory: BookingRequest[] | null = null

async function readAll(): Promise<BookingRequest[]> {
  if (memory) return memory
  try {
    memory = JSON.parse(await fs.readFile(FILE, 'utf8')) as BookingRequest[]
  } catch {
    memory = []
  }
  return memory
}

async function persist(list: BookingRequest[]) {
  memory = list
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true })
    await fs.writeFile(FILE, JSON.stringify(list, null, 2), 'utf8')
  } catch (err) {
    console.warn('[bookings] Không ghi được file, chỉ lưu trong bộ nhớ:', err)
  }
}

/** Mã yêu cầu dễ đọc qua điện thoại: NC-261026-4F7A */
function newId(createdAt: Date) {
  const ymd = createdAt.toISOString().slice(2, 10).replace(/-/g, '')
  return `NC-${ymd}-${randomUUID().slice(0, 4).toUpperCase()}`
}

export type NewBooking = Omit<BookingRequest, 'id' | 'createdAt' | 'status' | 'internalNote'>

export const bookingRepository = {
  async list(): Promise<BookingRequest[]> {
    return [...(await readAll())].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },

  async create(input: NewBooking): Promise<BookingRequest> {
    const now = new Date()
    const record: BookingRequest = { ...input, id: newId(now), createdAt: now.toISOString(), status: 'moi' }
    await persist([...(await readAll()), record])
    return record
  },
}
