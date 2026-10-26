'use client'

// F01 — Khối 2: carousel dạng coverflow cho 6 danh mục (REQUIREMENTS F01, v1.7).
// Thẻ giữa nổi bật, 2 thẻ mỗi bên thu nhỏ và mờ dần. Bấm thẻ bên → đưa ra giữa. Landing page một trang: thẻ không chuyển sang trang khác.
// Khoảng cách giữa các thẻ khai báo bằng biến CSS theo breakpoint (--p, --s), không đọc window.innerWidth → không lệch hydration.
import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import Image from 'next/image'
import type { Category } from '@/types'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons'

export interface CategoryCarouselItem {
  category: Category
}

/** Vị trí vòng tròn của thẻ so với thẻ giữa: …, -2, -1, 0, 1, 2, … */
function offsetOf(index: number, current: number, total: number) {
  const half = Math.floor(total / 2)
  let offset = (index - current) % total
  if (offset > half) offset -= total
  if (offset < -half) offset += total
  return offset
}

function cardStyle(offset: number): CSSProperties {
  const abs = Math.abs(offset)
  const sign = Math.sign(offset)
  if (abs > 2) {
    return {
      transform: `translateX(calc(-50% + ${sign} * (var(--p) + var(--s) * 2))) scale(0.65)`,
      opacity: 0,
      zIndex: 0,
    }
  }
  const x = abs === 0 ? '0px' : abs === 1 ? `${sign} * var(--p)` : `${sign} * (var(--p) + var(--s))`
  return {
    transform: `translateX(calc(-50% + ${x})) scale(${abs === 0 ? 1 : abs === 1 ? 0.92 : 0.82})`,
    // thẻ cạnh giữa để đặc (không lộ thẻ phía sau), chỉ tối nhẹ bằng filter
    opacity: abs === 2 ? 0.45 : 1,
    zIndex: 30 - abs * 10,
    filter: abs === 0 ? 'none' : 'brightness(0.92)',
  }
}

export function CategoryCarousel({ items }: { items: CategoryCarouselItem[] }) {
  const [current, setCurrent] = useState(0)
  const touchX = useRef<number | null>(null)
  const total = items.length

  const go = (step: number) => setCurrent((c) => (c + step + total) % total)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') go(-1)
    else if (e.key === 'ArrowRight') go(1)
    else return
    e.preventDefault()
  }

  const navBtn =
    'absolute top-1/2 z-40 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-cream/95 text-ink shadow-float backdrop-blur-md transition-[color,border-color,transform] duration-300 hover:scale-110 hover:border-accent hover:text-accent active:scale-95 sm:h-11 sm:w-11 md:h-12 md:w-12'

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Danh mục dịch vụ"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative -mx-4 select-none overflow-hidden py-1 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:mx-0 sm:rounded-3xl"
    >
      <div
        className="relative h-[495px] w-full [--p:135px] [--s:95px] sm:h-[535px] sm:[--p:210px] sm:[--s:130px] md:h-[575px] md:[--p:280px] md:[--s:175px] lg:h-[605px] lg:[--p:340px] lg:[--s:210px] xl:[--p:370px] xl:[--s:225px]"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
          touchX.current = null
        }}
      >
        <button type="button" onClick={() => go(-1)} aria-label="Danh mục trước" className={`${navBtn} left-1 sm:left-2 lg:left-3`}>
          <ChevronLeftIcon size={20} />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Danh mục tiếp theo" className={`${navBtn} right-1 sm:right-2 lg:right-3`}>
          <ChevronRightIcon size={20} />
        </button>

        {items.map(({ category: cat }, index) => {
          const offset = offsetOf(index, current, total)
          const isCenter = offset === 0
          const visible = Math.abs(offset) <= 2
          return (
            <div
              key={cat.slug}
              aria-hidden={!isCenter}
              aria-roledescription="slide"
              aria-label={isCenter ? `${cat.order} / ${total}` : undefined}
              style={cardStyle(offset)}
              className={`absolute left-1/2 top-0 h-[480px] w-[275px] transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none sm:h-[520px] sm:w-[325px] md:h-[560px] md:w-[365px] lg:h-[590px] lg:w-[385px] ${visible ? '' : 'pointer-events-none'
                }`}
            >
              {/* Thẻ bên: bấm để đưa ra giữa (bàn phím dùng nút trước/sau, phím mũi tên hoặc chấm phân trang) */}
              <div
                onClick={isCenter ? undefined : () => setCurrent(index)}
                className={`group flex h-full flex-col rounded-[24px] border border-line bg-cream p-3 shadow-float transition-shadow duration-500 sm:p-4 ${isCenter ? 'ring-2 ring-accent/20' : 'cursor-pointer hover:opacity-90'
                  }`}
              >
                <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-[18px] bg-cream-300">
                  <Image
                    src={cat.cover.src}
                    alt={cat.cover.alt}
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 370px, 390px"
                    className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
                    style={{ objectPosition: cat.cover.focus ?? '50% 50%' }}
                  />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                  <span className="glass-panel absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium tabular-nums text-ink-soft">
                    0{cat.order}
                  </span>
                </div>

                <div className="flex shrink-0 flex-col gap-3 px-1 pb-0.5 pt-3">
                  <div>
                    <h3 className="truncate font-display text-[1.3rem] font-medium leading-snug text-ink transition-colors group-hover:text-accent sm:text-[1.45rem]">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-muted">{cat.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {items.map(({ category: cat }, i) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Xem ${cat.name}`}
            aria-current={i === current ? 'true' : undefined}
            className="flex h-6 items-center px-0.5"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-accent' : 'w-1.5 bg-line-strong hover:bg-accent/60'
                }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
