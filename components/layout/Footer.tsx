// Footer — chỉ dùng dữ liệu [GỐC]/[SUY RA] từ lib/site-config.ts
import Link from 'next/link'
import { Logo } from './Logo'
import { bookingHref, branches, mainNav, siteConfig } from '@/lib/site-config'
import { FacebookIcon, MessengerIcon, PhoneIcon, ZaloIcon } from '@/components/ui/Icons'
import { WoolLine } from '@/components/ui/WoolLine'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream/75">
      <WoolLine className="pointer-events-none absolute -right-16 -top-10 w-[420px] text-cream/[0.07] md:w-[560px]" />

      <div className="container-page relative grid gap-12 pb-12 pt-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.4fr_1fr] lg:gap-10 lg:pt-20">
        <div>
          <Logo variant="light" className="h-14 w-auto md:h-16" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Studio chụp ảnh Bầu, Bé, Gia đình, Beauty cùng các concept cá nhân và nghệ thuật tại TP. Hồ Chí Minh.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fanpage Facebook Nhà Cừu Photography"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:bg-cream/10"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href={siteConfig.social.messenger}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nhắn Messenger"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:bg-cream/10"
            >
              <MessengerIcon size={18} />
            </a>
            <a
              href={siteConfig.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nhắn Zalo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:bg-cream/10"
            >
              <ZaloIcon size={24} textFill="var(--color-ink)" />
            </a>
          </div>
        </div>

        <nav aria-label="Liên kết chân trang">
          <h2 className="font-display text-xl text-cream">Khám phá</h2>
          <ul className="mt-5 grid gap-2.5 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={bookingHref} className="transition-colors hover:text-cream">
                Đặt lịch chụp
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-xl text-cream">Chi nhánh</h2>
          <ul className="mt-5 grid gap-5 text-sm leading-relaxed">
            {branches.map((b) => (
              <li key={b.id}>
                <p className="font-medium text-cream">{b.name}</p>
                <p className="mt-1">{b.address}</p>
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-block text-cream underline decoration-cream/30 underline-offset-4 transition-colors hover:decoration-cream"
                >
                  Chỉ đường
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl text-cream">Liên hệ</h2>
          <p className="mt-5 text-sm">Hotline / Zalo</p>
          <a
            href={siteConfig.phone.tel}
            className="mt-1 flex w-max items-center gap-2 font-display text-2xl text-cream transition-colors hover:text-accent-soft"
          >
            <PhoneIcon size={20} />
            {siteConfig.phone.display}
          </a>
        </div>
      </div>

      <div className="container-page relative border-t border-cream/10 pb-6 pt-6 text-xs lg:text-center text-cream/50 md:pb-8">
        © {siteConfig.copyrightYear} {siteConfig.name}.
      </div>
    </footer>
  )
}
