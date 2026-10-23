'use client'

// Lưới masonry + lightbox (F01 khối 6, F06).
// - Lightbox: phím ← → Esc, vuốt trên điện thoại, giữ focus trong popup, khóa cuộn trang.
// - Tự đóng khi rời trang: với Cache Components, trang cũ được giữ bằng <Activity> (REQUIREMENTS F06).
import Image from 'next/image'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Photo } from '@/types'
import { reveal } from '@/components/ui/Section'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, PlusIcon } from '@/components/ui/Icons'

export function GalleryMasonry({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null)

  // Trang bị ẩn bởi <Activity> → đóng popup để lúc quay lại không thấy popup đang mở
  useLayoutEffect(() => {
    return () => setIndex(null)
  }, [])

  // Desktop: 3 cột cố định [0–2] [3–5] [6–…]. Cột cuối co giãn để đáy 3 cột bằng nhau.
  // Mobile: các cột dùng `display: contents` → ảnh chảy vào CSS columns 2 cột theo đúng thứ tự.
  const columns = [photos.slice(0, 3), photos.slice(3, 6), photos.slice(6)]

  return (
    <>
      <div className="columns-2 gap-6 lg:flex lg:columns-auto lg:items-stretch lg:gap-8">
        {columns.map((col, ci) => {
          const offset = ci * 3
          const stretch = ci === columns.length - 1
          return (
            <div key={ci} className="contents lg:flex lg:flex-1 lg:flex-col lg:gap-8">
              {col.map((photo, j) => {
                const i = offset + j
                return (
                  <div
                    key={photo.src}
                    {...reveal('up', ci * 110 + j * 60)}
                    className={stretch ? 'mb-6 break-inside-avoid lg:mb-0 lg:min-h-0 lg:flex-1 lg:basis-0' : 'mb-6 break-inside-avoid lg:mb-0'}
                  >
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`group relative block w-full overflow-hidden rounded-2xl border border-line bg-cream-300${stretch ? ' lg:h-full' : ''}`}
                      aria-label={`Xem ảnh lớn: ${photo.alt}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        sizes="(min-width: 1024px) 380px, 50vw"
                        className={`h-auto w-full transition-transform duration-[900ms] ease-soft group-hover:scale-[1.04]${stretch ? ' lg:h-full lg:object-cover' : ''}`}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15"
                      >
                        <span className="inline-flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 transition-[opacity,scale] duration-500 group-hover:scale-100 group-hover:opacity-100">
                          <PlusIcon size={20} />
                        </span>
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {index !== null && (
        <Lightbox photos={photos} index={index} onIndexChange={setIndex} onClose={() => setIndex(null)} />
      )}
    </>
  )
}

function Lightbox({
  photos,
  index,
  onIndexChange,
  onClose,
}: {
  photos: Photo[]
  index: number
  onIndexChange: (i: number) => void
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const total = photos.length
  const photo = photos[index]

  const prev = useCallback(() => onIndexChange((index - 1 + total) % total), [index, total, onIndexChange])
  const next = useCallback(() => onIndexChange((index + 1) % total), [index, total, onIndexChange])

  // Mở: focus nút đóng, khóa cuộn. Đóng: trả focus về ảnh vừa bấm.
  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      opener?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, onClose])

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh bộ sưu tập"
      className="fixed inset-0 z-[60] flex flex-col bg-ink/95 text-cream"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) {
          if (dx > 0) prev()
          else next()
        }
        touchX.current = null
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-5">
        <p className="text-sm tabular-nums text-cream/70" aria-live="polite">
          {index + 1} / {total}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 transition-colors hover:bg-cream/10"
          aria-label="Đóng"
        >
          <CloseIcon size={20} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24" onClick={onClose}>
        <div className="relative h-full w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1280px) 1150px, 92vw"
            className="lightbox-fade object-contain"
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            prev()
          }}
          className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20 md:left-6 md:h-14 md:w-14"
          aria-label="Ảnh trước"
        >
          <ChevronLeftIcon size={22} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            next()
          }}
          className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20 md:right-6 md:h-14 md:w-14"
          aria-label="Ảnh sau"
        >
          <ChevronRightIcon size={22} />
        </button>
      </div>

      <p className="px-6 pb-6 pt-4 text-center text-sm text-cream/75 md:pb-8">{photo.alt}</p>
    </div>,
    document.body,
  )
}
