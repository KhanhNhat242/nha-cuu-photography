// F01 — Khối 4: 4 điểm mạnh có căn cứ từ phiếu (REQUIREMENTS 4.3). Không bịa số liệu.
// Bố cục bento so le: hàng trên lớn – nhỏ, hàng dưới nhỏ – lớn. Rê chuột vào thẻ nhỏ thì
// hai thẻ trong hàng đổi bề rộng (CSS .usp-row trong globals.css).
import Image from 'next/image'
import { strengths } from '@/data/home'
import { Section, SectionHeading, reveal } from '@/components/ui/Section'
import { BranchesIcon, CameraIcon, ChatIcon, SparkleIcon } from '@/components/ui/Icons'

const icons = {
  branches: BranchesIcon,
  camera: CameraIcon,
  sparkle: SparkleIcon,
  chat: ChatIcon,
} as const

const rows = [
  [
    { index: 0, size: 'large' },
    { index: 1, size: 'small' },
  ],
  [
    { index: 2, size: 'small' },
    { index: 3, size: 'large' },
  ],
] as const

export function StrengthsSection() {
  return (
    <Section tone="cream" labelledBy="strengths-title">
      <SectionHeading id="strengths-title" eyebrow="Vì sao chọn Nhà Cừu" title="Điều Nhà Cừu" accent="mang đến cho bạn" />

      <div className="flex flex-col gap-4 md:gap-5">
        {rows.map((row, r) => (
          <ul key={r} className="usp-row flex flex-col gap-4 md:flex-row md:gap-5">
            {row.map(({ index, size }, c) => {
              const item = strengths[index]
              const Icon = icons[item.icon]
              return (
                <li key={item.title} data-size={size} className="usp-card group relative h-80 md:h-96">
                  {/* Thẻ cột trái trượt vào từ trái, cột phải từ phải */}
                  <div
                    {...reveal(c === 0 ? 'left' : 'right', (r * 2 + c) * 120)}
                    className="absolute inset-0 overflow-hidden rounded-2xl bg-ink text-cream"
                  >
                    {/* Lớp bọc riêng cho hover để không đè transform của reveal-zoom */}
                    <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
                      <Image
                        src={item.photo.src}
                        alt={item.photo.alt}
                        fill
                        // thẻ nào cũng có lúc giãn tới 3/5 hàng khi hover
                        sizes="(min-width: 1280px) 750px, (min-width: 768px) 60vw, 100vw"
                        className="reveal-zoom object-cover"
                        style={{ objectPosition: item.photo.focus ?? '50% 30%' }}
                      />
                    </div>
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 via-55% to-ink/5" />

                    <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                      <h3 className="mt-4 font-display text-2xl font-medium md:text-[1.7rem] lg:whitespace-nowrap">
                        {item.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-3 block h-px w-10 bg-cream/70 transition-all duration-500 group-hover:w-16 group-hover:bg-cream"
                      />
                      <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-cream/85">{item.text}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        ))}
      </div>
    </Section>
  )
}
