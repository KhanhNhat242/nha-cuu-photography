// Khung section chuẩn — áp dụng quy chuẩn khoảng cách & nhịp nền (REQUIREMENTS 6.6).
import type { CSSProperties, ReactNode } from 'react'
import { WoolSquiggle } from './WoolLine'
import { SideOrnaments, type OrnamentVariant } from './SideOrnaments'

/** '' = không đặt nền riêng */
type Tone = 'cream' | 'cream-200' | ''

const toneClass: Record<Tone, string> = {
  cream: 'bg-cream',
  'cream-200': 'bg-cream-200 paper-grain',
  '': '',
}

export function Section({
  id,
  tone = '',
  divider = true,
  className = '',
  containerClassName = '',
  children,
  labelledBy,
  ornaments,
}: {
  id?: string
  tone?: Tone
  /** đường kẻ mảnh --color-line phía trên section */
  divider?: boolean
  className?: string
  containerClassName?: string
  children: ReactNode
  labelledBy?: string
  /** họa tiết vẽ tay ở hai mép dọc màn hình (components/ui/SideOrnaments.tsx) */
  ornaments?: OrnamentVariant
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-16 md:py-20 lg:py-28 ${toneClass[tone]} ${divider ? 'border-t border-line' : ''} ${ornaments ? 'overflow-x-clip' : ''} ${className}`}
    >
      {ornaments && <SideOrnaments variant={ornaments} />}
      <div className={`container-page relative ${containerClassName}`}>{children}</div>
    </section>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  accent,
  description,
  align = 'center',
  className = '',
}: {
  id: string
  eyebrow: string
  title: ReactNode
  /** phần chữ nghiêng màu nhấn nối sau tiêu đề */
  accent?: string
  description?: ReactNode
  align?: 'center' | 'left'
  className?: string
}) {
  const centered = align === 'center'
  return (
    <div
      className={`mb-8 md:mb-12 ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'} ${className}`}
    >
      <p
        {...reveal('up')}
        className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-accent ${centered ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 bg-accent/40" aria-hidden="true" />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-accent/40" aria-hidden="true" />}
      </p>
      <h2
        id={id}
        {...reveal('up', 80)}
        className="mt-4 font-display text-[2.1rem] font-medium leading-[1.12] text-ink sm:text-[2.5rem] lg:text-[3.1rem]"
      >
        {title}
        {accent && (
          <>
            {' '}
            <em className="font-normal italic text-accent">{accent}</em>
          </>
        )}
      </h2>
      <div {...reveal('up', 140)}>
        <WoolSquiggle
          className={`mt-4 h-3 w-24 text-line-strong ${centered ? 'mx-auto' : ''}`}
        />
      </div>
      {description && (
        <p
          {...reveal('up', 180)}
          className="mt-4 text-[15px] leading-relaxed text-ink-muted md:text-base"
        >
          {description}
        </p>
      )}
    </div>
  )
}

type RevealKind = 'up' | 'left' | 'right' | 'flip' | 'grow-x' | 'grow-c' | 'blur'

/**
 * Props cho hiệu ứng xuất hiện khi cuộn (app/globals.css + RevealObserver).
 * Dùng: <div {...reveal('up', 120)}>. Luôn dùng helper này, không viết data-reveal tay:
 * RevealObserver gắn thuộc tính data-revealed có thể trước khi React hydrate xong phần tử,
 * nên phần tử cần suppressHydrationWarning.
 */
export function reveal(kind: RevealKind = 'up', delayMs = 0) {
  return {
    'data-reveal': kind,
    suppressHydrationWarning: true,
    ...(delayMs ? { style: { '--reveal-delay': `${delayMs}ms` } as CSSProperties } : {}),
  }
}
