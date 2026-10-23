// F01 — Khối 4: 4 điểm mạnh có căn cứ từ phiếu (REQUIREMENTS 4.3). Không bịa số liệu.
import { strengths } from '@/data/home'
import { Section, SectionHeading, reveal } from '@/components/ui/Section'
import { BranchesIcon, CameraIcon, ChatIcon, SparkleIcon } from '@/components/ui/Icons'

const icons = {
  branches: BranchesIcon,
  camera: CameraIcon,
  sparkle: SparkleIcon,
  chat: ChatIcon,
} as const

export function StrengthsSection() {
  return (
    <Section tone="cream-200" labelledBy="strengths-title">
      <SectionHeading id="strengths-title" eyebrow="Vì sao chọn Nhà Cừu" title="Điều Nhà Cừu" accent="mang đến cho bạn" />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {strengths.map((item, i) => {
          const Icon = icons[item.icon]
          return (
            <li
              key={item.title}
              {...reveal('up', i * 110)}
              className="relative rounded-2xl border border-line bg-cream p-6 transition-shadow duration-500 hover:shadow-soft lg:p-7"
            >
              <span className="absolute right-6 top-6 font-display text-lg italic text-line-strong">0{i + 1}</span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon size={22} />
              </span>
              <h3 className="mt-6 font-display text-[1.45rem] font-medium leading-snug text-ink">{item.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{item.text}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
