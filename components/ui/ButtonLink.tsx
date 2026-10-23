// Nút dạng liên kết dùng chung (nội bộ dùng next/link, bên ngoài dùng thẻ a).
import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'light'
type Size = 'md' | 'lg'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,border-color,box-shadow] duration-300 ease-soft whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-cream shadow-float hover:bg-ink-soft',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]',
  ghost: 'text-ink hover:text-accent',
  light: 'bg-cream text-ink hover:bg-cream-200',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px] md:h-[52px] md:px-7',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  ariaLabel,
}: {
  href: string
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  external?: boolean
  ariaLabel?: string
}) {
  const cls = buttonClass(variant, size, className)
  if (external || href.startsWith('http') || href.startsWith('tel:')) {
    const isWeb = href.startsWith('http')
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
