import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

// Logo Nhà Cừu — bản đã xóa SĐT cũ (REQUIREMENTS 2.1, G12). Không dùng main-logo.jpg gốc.
export function Logo({
  variant = 'dark',
  className = 'h-10 w-auto lg:h-12',
  preload = false,
  onDark,
}: {
  variant?: 'dark' | 'light'
  className?: string
  preload?: boolean
  /** Có truyền → xếp chồng cả 2 bản và chuyển mờ dần: true = bản sáng (đang nằm trên ảnh tối), false = bản tối */
  onDark?: boolean
}) {
  const logo = siteConfig.logo[onDark === undefined ? variant : 'dark']
  const light = siteConfig.logo.light
  return (
    <Link href="/" aria-label={`${siteConfig.name} — về trang chủ`} className="relative inline-flex shrink-0 justify-self-start">
      <Image
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt={siteConfig.name}
        sizes="180px"
        preload={preload}
        className={`${className} ${onDark === undefined ? '' : `transition-opacity duration-500 ${onDark ? 'opacity-0' : 'opacity-100'}`}`}
      />
      {onDark !== undefined && (
        <Image
          src={light.src}
          width={light.width}
          height={light.height}
          alt=""
          aria-hidden="true"
          sizes="180px"
          preload={preload}
          className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500 ${onDark ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </Link>
  )
}
