// Họa tiết vẽ tay nét mảnh ở hai mép dọc màn hình, theo nội dung từng section (không dùng cho Hero).
// Chỉ để trang trí: aria-hidden, độ mờ thấp, nằm dưới nội dung, chỉ hiện từ xl (lề đủ rộng).
// Trái: khoảng 1/6 trên; phải: giữa section (tránh cụm nút nổi Zalo/Messenger ở góc dưới phải).
// Bay nhẹ bằng .deco-float (tắt khi prefers-reduced-motion — app/globals.css).
import type { CSSProperties, ReactNode } from 'react'
import { WoolLine } from './WoolLine'

export type OrnamentVariant = 'about' | 'categories' | 'concepts' | 'pricing' | 'gallery' | 'branches' | 'booking'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
} as const

function Svg({ viewBox, children, className }: { viewBox: string; children: ReactNode; className?: string }) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" focusable="false" className={className}>
      <g {...stroke}>{children}</g>
    </svg>
  )
}

/** Ngôi sao 4 cánh cong vào trong */
const star = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`

const Sparkles = ({ className }: { className?: string }) => (
  <Svg viewBox="0 0 120 150" className={className}>
    <path d={star(58, 46, 26)} />
    <path d={star(26, 104, 13)} />
    <path d={star(92, 112, 9)} />
    <circle cx="94" cy="20" r="2.5" />
    <circle cx="18" cy="40" r="2" />
    <path d="M40 140c10-6 24-6 34 0" strokeDasharray="2 6" />
  </Svg>
)

const Heart = ({ className }: { className?: string }) => (
  <Svg viewBox="0 0 120 130" className={className}>
    <path d="M60 104C24 80 12 56 24 38c11-16 30-12 36 4 6-16 25-20 36-4 12 18 0 42-36 66Z" />
    <path d="M60 94C34 76 26 58 34 46" opacity=".6" />
    <path d={star(100, 18, 8)} />
    <circle cx="16" cy="112" r="2.5" />
  </Svg>
)

const Camera = ({ className }: { className?: string }) => (
  <Svg viewBox="0 0 130 110" className={className}>
    <path d="M16 36h20l9-13h36l9 13h24a8 8 0 0 1 8 8v42a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8V44a8 8 0 0 1 8-8Z" />
    <circle cx="63" cy="64" r="19" />
    <circle cx="63" cy="64" r="10" />
    <path d="M98 46h8" />
    <path d="M20 28c0-6 4-10 10-10" opacity=".6" />
    <path d={star(116, 16, 7)} />
  </Svg>
)

const Branch = ({ className }: { className?: string }) => (
  <Svg viewBox="0 0 110 190" className={className}>
    <path d="M58 186C54 150 62 110 54 60 50 40 52 30 56 22" />
    <path d="M57 150c-20-2-32-14-34-28 15 1 29 12 34 28Z" />
    <path d="M58 118c18-4 28-18 28-32-14 3-26 15-28 32Z" />
    <path d="M55 86c-18-4-26-18-26-30 13 3 24 14 26 30Z" />
    <circle cx="56" cy="16" r="5" />
    <path d="M56 11c-3-8 3-12 6-8M61 15c8-3 11 4 6 7M58 21c4 8-3 11-6 7M51 18c-8 2-9-6-4-8M51 12c-4-7 3-10 5-6" />
  </Svg>
)

const Gift = ({ className }: { className?: string }) => (
  <Svg viewBox="0 0 120 130" className={className}>
    <path d="M22 56h76v62H22Z" />
    <path d="M14 40h92v16H14Z" />
    <path d="M60 40v78" />
    <path d="M60 40c-8-18-30-18-26-4 3 8 16 6 26 4Zm0 0c8-18 30-18 26-4-3 8-16 6-26 4Z" />
    <path d={star(104, 14, 7)} />
    <circle cx="14" cy="18" r="2" />
  </Svg>
)

const Balloon = ({ className }: { className?: string }) => (
  <Svg viewBox="0 0 110 190" className={className}>
    <path d="M55 12c22 0 34 18 34 36 0 22-18 38-34 40-16-2-34-18-34-40 0-18 12-36 34-36Z" />
    <path d="M38 34c4-8 10-12 16-12" opacity=".6" />
    <path d="m51 88 4 6 4-6" />
    <path d="M55 94c-8 14 8 22 0 36-6 12 4 20 2 30-1 8-6 14-4 24" />
  </Svg>
)

const Polaroid = ({ className }: { className?: string }) => (
  <Svg viewBox="0 0 120 140" className={className}>
    <g transform="rotate(-8 60 70)">
      <path d="M18 14h84v106H18Z" />
      <path d="M27 23h66v68H27Z" />
      <path d="m27 82 20-22 14 14 10-10 22 22" />
      <circle cx="78" cy="40" r="6" />
      <path d="M40 106c10-3 26-3 40 0" opacity=".6" />
    </g>
  </Svg>
)

const holes = Array.from({ length: 12 }, (_, i) => 18 + i * 12)
const FilmStrip = ({ className }: { className?: string }) => (
  <Svg viewBox="0 0 110 180" className={className}>
    <g transform="rotate(6 55 90)">
      <path d="M30 8h50v164H30Z" />
      <path d="M42 8v164M68 8v164" opacity=".5" />
      <path d="M42 50h26M42 92h26M42 134h26" />
      {holes.map((y) => (
        <path key={y} d={`M33 ${y}h5v5h-5ZM72 ${y}h5v5h-5Z`} />
      ))}
    </g>
  </Svg>
)

const MapPin = ({ className }: { className?: string }) => (
  <Svg viewBox="0 0 120 180" className={className}>
    <path d="M60 102C40 74 30 60 30 46a30 30 0 0 1 60 0c0 14-10 28-30 56Z" />
    <circle cx="60" cy="46" r="10" />
    <path d="M60 108c-22 18 12 32-10 52-6 6-14 10-22 12" strokeDasharray="3 7" />
  </Svg>
)

const House = ({ className }: { className?: string }) => (
  <Svg viewBox="0 0 120 130" className={className}>
    <path d="M14 68 60 30l46 38" />
    <path d="M26 58v54h68V58" />
    <path d="M52 112V88h16v24" />
    <circle cx="60" cy="62" r="7" />
    <path d="M82 40V24h10v24" />
    <path d="M90 16c4-6 10-6 12-2" opacity=".6" />
  </Svg>
)

const Calendar = ({ className }: { className?: string }) => (
  <Svg viewBox="0 0 120 120" className={className}>
    <path d="M16 28h88v80H16Z" />
    <path d="M16 48h88M38 18v18M82 18v18" />
    <path d="M60 96C46 86 40 78 44 70c3-6 12-6 16 2 4-8 13-8 16-2 4 8-2 16-16 26Z" />
  </Svg>
)

const Wool = ({ className }: { className?: string }) => <WoolLine className={className} strokeWidth={1.4} />

const pairs: Record<OrnamentVariant, [left: (p: { className?: string }) => ReactNode, right: (p: { className?: string }) => ReactNode]> = {
  about: [Sparkles, Heart],
  categories: [Camera, Wool],
  concepts: [Branch, Balloon],
  pricing: [Branch, Gift],
  gallery: [Polaroid, FilmStrip],
  branches: [MapPin, House],
  booking: [Calendar, Sparkles],
}

export function SideOrnaments({ variant }: { variant: OrnamentVariant }) {
  const [Left, Right] = pairs[variant]
  const side = 'pointer-events-none absolute hidden w-[7.5rem] text-accent/40 xl:block 2xl:w-36'
  return (
    <>
      <div aria-hidden="true" className={`${side} left-0 top-[16%] -translate-x-[35%] min-[1400px]:translate-x-0 2xl:left-[calc((100vw-1240px)/2-10rem)]`}>
        <div className="deco-float">
          <Left className="h-auto w-full" />
        </div>
      </div>
      <div aria-hidden="true" className={`${side} right-0 top-[48%] translate-x-[35%] min-[1400px]:translate-x-0 2xl:right-[calc((100vw-1240px)/2-10rem)]`}>
        <div className="deco-float" style={{ animationDelay: '-4.5s' } as CSSProperties}>
          <Right className="h-auto w-full" />
        </div>
      </div>
    </>
  )
}
