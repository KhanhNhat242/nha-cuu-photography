import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

// Logo Nhà Cừu — bản đã xóa SĐT cũ (REQUIREMENTS 2.1, G12). Không dùng main-logo.jpg gốc.
export function Logo({
  variant = 'dark',
  className = 'h-10 w-auto lg:h-12',
  preload = false,
}: {
  variant?: 'dark' | 'light'
  className?: string
  preload?: boolean
}) {
  const logo = siteConfig.logo[variant]
  return (
    <Link href="/" aria-label={`${siteConfig.name} — về trang chủ`} className="inline-flex shrink-0">
      <Image
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt={siteConfig.name}
        sizes="180px"
        preload={preload}
        className={className}
      />
    </Link>
  )
}
