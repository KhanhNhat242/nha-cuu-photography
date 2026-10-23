// Cụm nút nổi Zalo / Messenger / Gọi điện (F10) — có trên mọi trang.
import { siteConfig } from '@/lib/site-config'
import { MessengerIcon, PhoneIcon, ZaloIcon } from '@/components/ui/Icons'

const items = [
  {
    href: siteConfig.social.zalo,
    label: 'Nhắn Zalo',
    icon: <ZaloIcon size={30} className="text-zalo" />,
    external: true,
    mobileOnly: false,
  },
  {
    href: siteConfig.social.messenger,
    label: 'Nhắn Messenger',
    icon: <MessengerIcon size={26} className="text-messenger" />,
    external: true,
    mobileOnly: false,
  },
  {
    href: siteConfig.phone.tel,
    label: `Gọi ${siteConfig.phone.display}`,
    icon: <PhoneIcon size={22} className="text-ink" />,
    external: false,
    mobileOnly: true,
  },
]

export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2.5 md:bottom-6 md:right-6 md:gap-3">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`group relative inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-line bg-cream shadow-float transition-transform duration-300 ease-soft hover:-translate-y-0.5 ${
            item.mobileOnly ? 'md:hidden' : ''
          }`}
        >
          {item.icon}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
          >
            {item.label}
          </span>
        </a>
      ))}
    </div>
  )
}
