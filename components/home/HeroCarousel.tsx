'use client'

// F01 — Khối 1: Hero carousel ảnh nền toàn khung (REQUIREMENTS F01, v1.4).
// - Ảnh đang chọn là nền toàn bộ Hero (nhích phóng chậm kiểu Ken Burns).
// - Dải thẻ nhỏ góc dưới phải = các ảnh còn lại. Bấm thẻ → ảnh trong thẻ PHÓNG TO từ đúng vị trí thẻ
//   ra phủ kín Hero rồi trở thành nền (kỹ thuật FLIP: đo vị trí thẻ, đặt lớp phủ tại đó, chuyển dần về toàn khung).
// - Không bấm → sau `delay` ms tự phóng to thẻ kế tiếp. Rê chuột/focus vào khu điều khiển, bấm nút tạm dừng
//   hoặc chuyển tab khác → dừng. prefers-reduced-motion → đổi ảnh tức thì, không tự chạy.
import Image from 'next/image'
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react'
import type { HeroSlide } from '@/data/home'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '@/components/ui/Icons'

const ZOOM_MS = 950

type Zoom = { index: number; from: { top: number; left: number; width: number; height: number }; to: { width: number; height: number } }

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function subscribeVisibility(cb: () => void) {
  document.addEventListener('visibilitychange', cb)
  return () => document.removeEventListener('visibilitychange', cb)
}
const getHidden = () => document.hidden

const pad = (n: number) => String(n).padStart(2, '0')

export function HeroCarousel({
  id,
  slides,
  headline,
  description,
  delay,
  bookingHref,
  conceptsHref,
}: {
  id: string
  slides: HeroSlide[]
  headline: string
  description: string
  delay: number
  bookingHref: string
  conceptsHref: string
}) {
  const n = slides.length
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState<Zoom | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
  const tabHidden = useSyncExternalStore(subscribeVisibility, getHidden, () => false)

  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef(new Map<number, HTMLButtonElement>())

  const paused = hovering || userPaused || tabHidden || reduceMotion
  const queue = Array.from({ length: n - 1 }, (_, k) => (active + k + 1) % n)

  /** Chuyển tới ảnh `index`: phóng to từ thẻ của nó (nếu có hiệu ứng), nếu không thì đổi ngay. */
  const goTo = useCallback(
    (index: number) => {
      if (index === active || zoom) return
      const section = sectionRef.current
      const card = cardRefs.current.get(index)
      if (reduceMotion || !section || !card || card.offsetParent === null) {
        setActive(index)
        return
      }
      const s = section.getBoundingClientRect()
      const c = card.getBoundingClientRect()
      setExpanded(false)
      setZoom({
        index,
        from: { top: c.top - s.top, left: c.left - s.left, width: c.width, height: c.height },
        to: { width: s.width, height: s.height },
      })
    },
    [active, zoom, reduceMotion],
  )

  const finishZoom = (index: number) => {
    setActive(index)
    setZoom(null)
    setExpanded(false)
  }

  // Lớp phủ vừa được đặt đúng vị trí thẻ → khung hình kế tiếp mới cho nó giãn ra toàn khung
  useLayoutEffect(() => {
    if (!zoom) return
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setExpanded(true))
    })
    // Dự phòng nếu transitionend không bắn (tab ẩn giữa chừng...)
    const done = window.setTimeout(() => finishZoom(zoom.index), ZOOM_MS + 250)
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      window.clearTimeout(done)
    }
  }, [zoom])

  // Tự chạy: chờ `delay` rồi phóng to thẻ kế tiếp
  useEffect(() => {
    if (paused || zoom) return
    const t = window.setTimeout(() => goTo((active + 1) % n), delay)
    return () => window.clearTimeout(t)
  }, [active, paused, zoom, delay, n, goTo])

  // Trang bị ẩn bởi <Activity> → bỏ hiệu ứng đang dở
  useLayoutEffect(() => {
    return () => {
      setZoom(null)
      setExpanded(false)
    }
  }, [])

  const current = slides[active]
  const zoomSlide = zoom ? slides[zoom.index] : null

  const zoomStyle: CSSProperties | undefined = zoom
    ? expanded
      ? { top: 0, left: 0, width: zoom.to.width, height: zoom.to.height, borderRadius: 0 }
      : { ...zoom.from, borderRadius: 18 }
    : undefined

  return (
    <section
      id={id}
      ref={sectionRef}
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      className="relative isolate -mt-[calc(var(--header-h)+1px)] flex min-h-svh flex-col overflow-hidden bg-ink pt-(--header-h) text-cream lg:h-svh lg:min-h-[calc(640px+var(--header-h))] lg:max-h-[calc(1000px+var(--header-h))]"
    >
      {/* Ảnh nền: xếp chồng, chỉ ảnh đang chọn hiện */}
      {slides.map((s, i) => (
        <div key={s.photo.src} aria-hidden={i !== active} className={`absolute inset-0 ${i === active ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src={s.photo.src}
            alt={i === active ? s.photo.alt : ''}
            fill
            sizes="100vw"
            preload={i === 0}
            className={`object-cover ${i === active ? 'anim-kenburns' : ''}`}
            style={{ objectPosition: s.photo.focus }}
          />
        </div>
      ))}

      {/* Lớp phóng to từ thẻ ra toàn khung */}
      {zoom && zoomSlide && (
        <div
          aria-hidden="true"
          className="absolute z-[1] overflow-hidden shadow-float"
          style={{
            ...zoomStyle,
            transition: `top ${ZOOM_MS}ms var(--ease-soft), left ${ZOOM_MS}ms var(--ease-soft), width ${ZOOM_MS}ms var(--ease-soft), height ${ZOOM_MS}ms var(--ease-soft), border-radius ${ZOOM_MS}ms var(--ease-soft)`,
          }}
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget && e.propertyName === 'width' && expanded) finishZoom(zoom.index)
          }}
        >
          <Image
            src={zoomSlide.photo.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: expanded ? zoomSlide.photo.focus : zoomSlide.cardFocus,
              transition: `object-position ${ZOOM_MS}ms var(--ease-soft)`,
            }}
          />
        </div>
      )}

      {/* Lớp tối để chữ đọc rõ */}
      <div aria-hidden="true" className="absolute inset-0 z-[2] bg-gradient-to-r from-ink/85 via-ink/45 to-ink/5" />
      {/* nền tối nhẹ phía trên để chữ của header trong suốt đọc rõ */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-[2] h-48 bg-gradient-to-b from-ink/60 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[2] h-2/3 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />

      <div className="container-page relative z-[3] flex flex-1 flex-col justify-between gap-10 pb-6 pt-10 sm:pb-8 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-12 lg:pt-10">
        {/* Chữ bên trái */}
        <div className="flex flex-1 lg:col-span-6 lg:h-full lg:pt-20 xl:col-span-7">
          <div className="max-w-2xl">
            <h1 id="hero-title" className="anim-rise font-display text-lg italic text-cream/85 sm:text-xl">
              {headline}
            </h1>

            <div key={active} aria-live={paused && !reduceMotion ? 'polite' : 'off'}>
              <p
                className="anim-rise mt-3 text-balance font-display text-[3.1rem] font-medium leading-[0.98] tracking-[-0.01em] sm:text-[4.2rem] lg:text-[4.6rem] xl:text-[5.4rem]"
                style={{ '--delay': '140ms' } as CSSProperties}
              >
                {current.title}
              </p>
            </div>

            <p className="anim-rise mt-5 max-w-md text-[15px] leading-relaxed text-cream/80 sm:text-base" style={{ '--delay': '220ms' } as CSSProperties}>
              {description}
            </p>
          </div>
        </div>

        {/* Dải thẻ + điều khiển, góc dưới bên phải */}
        <div
          className="flex flex-col gap-5 lg:col-span-6 xl:col-span-5"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovering(false)
          }}
        >
          <ul className="-mx-4 flex gap-2.5 overflow-x-auto pb-1 pl-4 pr-[5rem] [scrollbar-width:none] sm:mx-0 sm:gap-3 sm:px-0 lg:justify-end-safe lg:pr-[4.5rem] lg:[mask-image:linear-gradient(to_right,black_80%,transparent)] min-[1400px]:pr-0" aria-label="Chọn ảnh">
            {queue.map((i, pos) => {
              const s = slides[i]
              const hidden = zoom?.index === i
              return (
                <li key={s.photo.src} className="shrink-0">
                  <button
                    ref={(el) => {
                      if (el) cardRefs.current.set(i, el)
                      else cardRefs.current.delete(i)
                    }}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Xem ảnh ${pad(i + 1)}: ${s.title}`}
                    className={`group relative block h-[128px] w-[90px] overflow-hidden rounded-[18px] border border-cream/20 shadow-float transition-[opacity,transform] duration-500 ease-soft hover:-translate-y-1.5 sm:h-[190px] sm:w-[136px] lg:h-[168px] lg:w-[118px] xl:h-[172px] xl:w-[120px] min-[1400px]:h-[200px] min-[1400px]:w-[140px] ${hidden ? 'opacity-0' : 'opacity-100'
                      }`}
                    style={{ transitionDelay: hidden ? '0ms' : `${pos * 60}ms` }}
                  >
                    <Image
                      src={s.photo.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 170px, 140px"
                      className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
                      style={{ objectPosition: s.cardFocus }}
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                    <span className="absolute inset-x-2.5 bottom-2.5 text-left sm:inset-x-3 sm:bottom-3">
                      <span aria-hidden="true" className="mb-2 block h-px w-5 bg-cream/70" />
                      <span className="hidden text-[9.5px] uppercase tracking-[0.18em] text-cream/75 sm:block lg:text-[10.5px]">{s.eyebrow}</span>
                      <span className="block font-display text-[14px] font-medium leading-tight sm:mt-1 sm:text-[16px] lg:text-[18px]">
                        {s.title}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* chừa chỗ bên phải cho cụm nút Zalo/Messenger nổi (F10) khi màn hình hẹp */}
          <div className="flex items-center gap-3 pr-[4.5rem] sm:gap-4 md:pr-[5rem] min-[1400px]:pr-0">
            <button
              type="button"
              onClick={() => goTo((active - 1 + n) % n)}
              aria-label="Ảnh trước"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/40 transition-colors hover:bg-cream/10 lg:h-12 lg:w-12"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              onClick={() => goTo((active + 1) % n)}
              aria-label="Ảnh sau"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/40 transition-colors hover:bg-cream/10 lg:h-12 lg:w-12"
            >
              <ChevronRightIcon size={20} />
            </button>
            {!reduceMotion && (
              <button
                type="button"
                onClick={() => setUserPaused((v) => !v)}
                aria-label={userPaused ? 'Tiếp tục tự chuyển ảnh' : 'Tạm dừng tự chuyển ảnh'}
                aria-pressed={userPaused}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream lg:h-12 lg:w-12"
              >
                {userPaused ? <PlayIcon size={18} /> : <PauseIcon size={18} />}
              </button>
            )}

            {/* Thanh tiến trình: chạy đúng thời gian chờ tự chuyển; dừng thì đứng yên */}
            <div className="relative h-px flex-1 bg-cream/25" aria-hidden="true">
              <span
                key={`${active}-${paused}-${!!zoom}`}
                className={`absolute inset-0 bg-accent-soft ${paused || zoom ? 'scale-x-0' : 'anim-progress'}`}
                style={{ '--duration': `${delay}ms` } as CSSProperties}
              />
            </div>

            <p className="shrink-0 font-display text-[2.4rem] leading-none tabular-nums lining-nums lg:text-[3.2rem]">
              <span className="sr-only">Ảnh </span>
              {pad(active + 1)}
              <span className="ml-1 align-top text-sm text-cream/60 lg:text-base">/ {pad(n)}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
