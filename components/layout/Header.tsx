'use client'

// Header cố định (F01): logo trái, 6 mục menu giữa, nút Đặt lịch phải (kèm số concept đã chọn).
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { bookingHref, mainNav, siteConfig } from '@/lib/site-config'
import { useSelectedConcepts } from '@/lib/concept-selection'
import { CalendarIcon, CloseIcon, MenuIcon, PhoneIcon } from '@/components/ui/Icons'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header({ validSlugs }: { validSlugs: string[] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const count = useSelectedConcepts().filter((s) => validSlugs.includes(s)).length

  // Đóng menu mobile khi đã chuyển trang
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    const raf = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
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

  return (
    <>
      <header
        className={`glass-panel sticky top-0 z-50 border-b transition-[border-color,box-shadow] duration-300 ${
          scrolled || open ? 'border-line shadow-[0_8px_30px_-20px_rgb(58_51_48/0.25)]' : 'border-transparent'
        }`}
      >
        <div className="container-page flex h-(--header-h) items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Logo preload className="h-10 w-auto sm:h-11 lg:h-[3.6rem]" />

          <nav aria-label="Menu chính" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`relative inline-flex h-10 items-center px-3 text-[14.5px] transition-colors duration-300 ${
                        active ? 'font-medium text-ink' : 'text-ink-muted hover:text-ink'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 bottom-1.5 h-px origin-center bg-accent transition-transform duration-500 ease-soft ${
                          active ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 lg:justify-self-end">
            <Link
              href={bookingHref}
              className="relative inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[13.5px] font-medium text-cream shadow-float transition-colors duration-300 hover:bg-ink-soft lg:h-11 lg:px-6 lg:text-sm"
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
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Đóng menu' : 'Mở menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-cream-200 lg:hidden"
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
        className={`fixed inset-x-0 bottom-0 top-(--header-h) z-[45] overflow-y-auto bg-cream transition-[opacity,transform] duration-500 ease-soft lg:hidden ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
      >
        <nav aria-label="Menu di động" className="container-page flex min-h-full flex-col pb-10 pt-6">
          <ul className="divide-y divide-line border-y border-line">
            {mainNav.map((item, i) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span
                      className={`font-display text-[1.75rem] leading-none ${active ? 'italic text-accent' : 'text-ink'}`}
                    >
                      {item.label}
                    </span>
                    <span className="text-xs tabular-nums text-ink-muted">0{i + 1}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link
              href={bookingHref}
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-cream"
            >
              <CalendarIcon size={18} />
              Đặt lịch chụp
            </Link>
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
