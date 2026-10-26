// F01 — Khối 7: Hệ thống 2 chi nhánh (REQUIREMENTS 2.2, 2.3)
// CN Thủ Đức: bản đồ nhúng theo tọa độ ghim. CN Gò Vấp: chưa có ghim chính thức → minh họa + link tìm kiếm.
import { branches, siteConfig, sectionIds } from '@/lib/site-config'
import { Section, SectionHeading, reveal } from '@/components/ui/Section'
import { ArrowUpRightIcon, MapPinIcon, PhoneIcon } from '@/components/ui/Icons'
import type { Branch } from '@/types'

function MapIllustration({ label }: { label: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-cream-200" aria-hidden="true">
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <g className="text-line-strong" stroke="currentColor" fill="none" strokeLinecap="round">
          <path d="M-10 70 C80 60 140 95 230 80 S360 40 420 55" strokeWidth="14" className="text-cream" />
          <path d="M-10 70 C80 60 140 95 230 80 S360 40 420 55" strokeWidth="1.2" />
          <path d="M60 -10 C70 70 50 160 80 260" strokeWidth="1.2" />
          <path d="M175 -10 L190 260" strokeWidth="10" className="text-cream" />
          <path d="M175 -10 L190 260" strokeWidth="1.2" />
          <path d="M300 -10 C285 90 320 170 300 260" strokeWidth="1.2" />
          <path d="M-10 175 C100 165 260 200 420 180" strokeWidth="1.2" />
          <path d="M-10 225 L420 215" strokeWidth="1" strokeDasharray="3 6" />
        </g>
        <g className="text-cream-300" fill="currentColor">
          <rect x="88" y="98" width="70" height="50" rx="8" />
          <rect x="210" y="102" width="74" height="58" rx="8" />
          <rect x="320" y="76" width="60" height="80" rx="8" />
          <rect x="20" y="190" width="120" height="24" rx="8" />
        </g>
      </svg>
      <div className="absolute left-1/2 top-[44%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream shadow-float">
          <MapPinIcon size={22} />
          <span className="absolute inset-0 animate-ping rounded-full bg-ink/20 motion-reduce:animate-none" />
        </span>
        <span className="mt-1 h-3 w-px bg-ink/40" />
      </div>
      <p className="glass-panel absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line px-4 py-2 text-xs font-medium text-ink-soft">
        {label}
      </p>
    </div>
  )
}

function BranchCard({ branch, index }: { branch: Branch; index: number }) {
  return (
    <li
      {...reveal('up', index * 120)}
      className="flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-cream"
    >
      <div className="relative aspect-[16/10] border-b border-line bg-cream-200">
        {branch.mapEmbedUrl ? (
          <iframe
            src={branch.mapEmbedUrl}
            title={`Bản đồ ${branch.name} — ${siteConfig.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 [filter:saturate(0.75)_sepia(0.08)]"
          />
        ) : (
          <MapIllustration label="Cityland Park Hills · Gần LOTTE Mart" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">Chi nhánh 0{index + 1}</p>
        <h3 className="mt-2 font-display text-[1.9rem] font-medium leading-tight text-ink">{branch.name}</h3>
        <p className="mt-4 flex gap-3 text-[15px] leading-relaxed text-ink-soft">
          <MapPinIcon size={20} className="mt-0.5 shrink-0 text-accent" />
          {branch.address}
        </p>
        <p className="mt-2 pl-8 text-sm italic text-ink-muted">{branch.note}</p>

        <div className="mt-auto pt-6">
          <a
            href={branch.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-ink/25 px-5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
          >
            Chỉ đường
            <span className="sr-only"> tới {branch.name}</span>
            <ArrowUpRightIcon size={16} />
          </a>
        </div>
      </div>
    </li>
  )
}

export function BranchesSection() {
  return (
    <Section id={sectionIds.contact} tone="cream" labelledBy="branches-title">
      <SectionHeading id="branches-title" eyebrow="Hệ thống chi nhánh" title="Ghé thăm" accent="Nhà Cừu" />

      <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {branches.map((b, i) => (
          <BranchCard key={b.id} branch={b} index={i} />
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-1 text-center md:mt-14" {...reveal('up')}>
        <p className="text-sm uppercase tracking-[0.2em] text-ink-muted">Hotline / Zalo</p>
        <a
          href={siteConfig.phone.tel}
          className="inline-flex items-center gap-3 font-display text-[2rem] text-ink transition-colors hover:text-accent md:text-[2.4rem]"
        >
          <PhoneIcon size={26} className="text-accent" />
          {siteConfig.phone.display}
        </a>
      </div>
    </Section>
  )
}
