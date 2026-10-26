'use client'

// Header cố định (F01): logo trái, 6 mục menu giữa, nút Đặt lịch phải (kèm số concept đã chọn).
// Landing page một trang (REQUIREMENTS mục 7): menu cuộn tới section bằng anchor, không chuyển trang.
// Mục đang xem được làm nổi nhờ scrollspy (IntersectionObserver).
// Trang chủ, khi đang ở đầu trang: header trong suốt, chữ sáng, hòa vào ảnh Hero phía sau. Cuộn xuống → nền kem.
import { useEffect, useState, type MouseEvent } from 'react'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { bookingHref, mainNav, sectionIds, siteConfig } from '@/lib/site-config'
import { useSelectedConcepts } from '@/lib/concept-selection'
import { CalendarIcon, CloseIcon, MenuIcon, PhoneIcon } from '@/components/ui/Icons'

const spyIds: string[] = [...mainNav.map((n) => n.id), sectionIds.booking]

/** Cuộn mượt tới section (tôn trọng prefers-reduced-motion). Header được trừ bằng scroll-padding-top. */
function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
  return true
}

export function Header({ validSlugs }: { validSlugs: string[] }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string>(sectionIds.hero)
  const count = useSelectedConcepts().filter((s) => validSlugs.includes(s)).length
  // Hero trang chủ nằm dưới header (HeroCarousel kéo lên bằng -mt-(--header-h))
  const overHero = usePathname() === '/' && !scrolled && !open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    const raf = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Scrollspy: section cắt qua giữa màn hình là section đang xem
  useEffect(() => {
    const sections = spyIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActiveId(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  /** Bấm menu: cuộn tới section trên trang này. Nếu section không có (đang ở route khác) → để trình duyệt về "/#id". */
  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!document.getElementById(id)) return
    e.preventDefault()
    if (open) {
      // đóng menu mobile (mở khóa cuộn trang) rồi mới cuộn
      setOpen(false)
      window.setTimeout(() => scrollToSection(id), 60)
    } else {
      scrollToSection(id)
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-soft ${overHero
            ? 'border-transparent bg-transparent'
            : `bg-cream/85 backdrop-blur-[12px] ${scrolled || open ? 'border-line shadow-[0_8px_30px_-20px_rgb(58_51_48/0.25)]' : 'border-transparent'}`
          }`}
      >
        <div className="container-page flex h-(--header-h) items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Logo preload onDark={overHero} className="h-10 w-auto sm:h-11 lg:h-[3.6rem]" />

          <nav aria-label="Menu chính" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {mainNav.map((item) => {
                const active = activeId === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => go(e, item.id)}
                      aria-current={active ? 'location' : undefined}
                      className={`relative inline-flex h-10 items-center px-3 text-[14.5px] transition-colors duration-300 ${overHero
                          ? active
                            ? 'font-medium text-cream'
                            : 'text-cream/75 hover:text-cream'
                          : active
                            ? 'font-medium text-ink'
                            : 'text-ink-muted hover:text-ink'
                        }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 bottom-1.5 h-px origin-center transition-[transform,background-color] ${overHero ? 'bg-cream' : 'bg-accent'} duration-500 ease-soft ${active ? 'scale-x-100' : 'scale-x-0'
                          }`}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 lg:justify-self-end">
            <a
              href='#bang-gia'
              onClick={(e) => go(e, sectionIds.booking)}
              className={`relative inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13.5px] font-medium shadow-float transition-colors duration-500 lg:h-11 lg:px-6 lg:text-sm ${overHero ? 'bg-cream text-ink hover:bg-cream-200' : 'bg-ink text-cream hover:bg-ink-soft'
                }`}
            >
              <CalendarIcon size={17} className="hidden sm:block" />
              Đặt lịch
              {count > 0 && (
                <span
                  className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold leading-none text-cream ring-2 ring-cream"
                  aria-label={`${count} concept đã chọn`}
                >
                  {count}
                </span>
              )}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Đóng menu' : 'Mở menu'}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden ${overHero ? 'border-cream/40 text-cream hover:bg-cream/10' : 'border-line text-ink hover:bg-cream-200'
                }`}
            >
              {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile — đặt ngoài <header> vì backdrop-filter tạo containing block cho phần tử fixed */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-(--header-h) z-[45] overflow-y-auto bg-cream transition-[opacity,transform] duration-500 ease-soft lg:hidden ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
          }`}
      >
        <nav aria-label="Menu di động" className="container-page flex min-h-full flex-col pb-10 pt-6">
          <ul className="divide-y divide-line border-y border-line">
            {mainNav.map((item, i) => {
              const active = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => go(e, item.id)}
                    aria-current={active ? 'location' : undefined}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span
                      className={`font-display text-[1.75rem] leading-none ${active ? 'italic text-accent' : 'text-ink'}`}
                    >
                      {item.label}
                    </span>
                    <span className="text-xs tabular-nums text-ink-muted">0{i + 1}</span>
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="mt-8 grid gap-3">
            <a
              href={bookingHref}
              onClick={(e) => go(e, sectionIds.booking)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-cream"
            >
              <CalendarIcon size={18} />
              Đặt lịch chụp
            </a>
            <a
              href={siteConfig.phone.tel}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/20 text-[15px] font-medium text-ink"
            >
              <PhoneIcon size={18} />
              {siteConfig.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
