// F01 — Khối 5: Trích bảng giá theo gói. Chưa có giá thật → "Liên hệ báo giá" (R2.4).
import { packages } from '@/data/packages'
import { formatPrice, bookingUrl } from '@/lib/format'
import { Section, SectionHeading, reveal } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon, CheckIcon } from '@/components/ui/Icons'

export function PricingPreviewSection() {
  return (
    <Section tone="cream" labelledBy="pricing-title">
      <SectionHeading
        id="pricing-title"
        eyebrow="Bảng giá theo gói"
        title="Chọn gói chụp"
        accent="phù hợp với bạn"
        description="Nhà Cừu sẽ báo giá chi tiết theo concept và nhu cầu của bạn."
      />

      <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:items-center lg:gap-8">
        {packages.map((pkg, i) => {
          const hl = pkg.highlighted
          return (
            <li
              key={pkg.id}
              {...reveal('up', i * 110)}
              className={`relative flex flex-col rounded-[1.75rem] border p-7 lg:p-8 ${
                hl
                  ? 'border-ink bg-ink text-cream shadow-soft md:py-11 lg:py-12'
                  : 'border-line bg-cream text-ink'
              }`}
            >
              {hl && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cream">
                  Gói gợi ý
                </span>
              )}
              <h3 className="font-display text-[1.75rem] font-medium leading-tight">{pkg.name}</h3>
              <p className={`mt-1 text-sm ${hl ? 'text-cream/70' : 'text-ink-muted'}`}>{pkg.tagline}</p>

              <p
                className={`mt-6 border-y py-4 font-display text-[1.6rem] italic ${
                  hl ? 'border-cream/15' : 'border-line'
                }`}
              >
                {formatPrice(pkg.price)}
              </p>

              <ul className="mt-6 grid gap-3 text-[14.5px]">
                {pkg.includes.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        hl ? 'bg-cream/15 text-cream' : 'bg-accent-soft text-accent'
                      }`}
                    >
                      <CheckIcon size={13} strokeWidth={2} />
                    </span>
                    <span className={hl ? 'text-cream/90' : 'text-ink-soft'}>{line}</span>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={bookingUrl({ packageId: pkg.id })}
                variant={hl ? 'light' : 'outline'}
                className="mt-8 w-full"
              >
                Chọn gói này
              </ButtonLink>
            </li>
          )
        })}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-4 text-center md:mt-14" {...reveal('up')}>
        <p className="max-w-xl text-[13px] italic text-ink-muted">
          * Quyền lợi chi tiết của từng gói sẽ được Nhà Cừu tư vấn theo concept bạn chọn.
        </p>
        <ButtonLink href="/bang-gia" variant="ghost" className="px-0 underline decoration-ink/20 underline-offset-4">
          Xem bảng giá chi tiết
          <ArrowRightIcon size={16} />
        </ButtonLink>
      </div>
    </Section>
  )
}
