// F01 — Khối 5: Trích bảng giá theo gói + form gửi yêu cầu đặt lịch (F08) ở cột phải.
// Chưa có giá thật → "Liên hệ báo giá" (R2.4). Nút "Chọn gói này" điền sẵn gói vào form, không chuyển trang.
import { packages } from '@/data/packages'
import { categories } from '@/data/categories'
import { getConceptsByCategory } from '@/data/concepts'
import { formatPrice } from '@/lib/format'
import { Section, SectionHeading, reveal } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon, CheckIcon } from '@/components/ui/Icons'
import { BookingForm } from '@/components/booking/BookingForm'
import { SelectPackageButton } from '@/components/booking/SelectPackageButton'
import { branches, sectionIds } from '@/lib/site-config'

export function PricingPreviewSection() {
  const conceptGroups = [...categories]
    .sort((a, b) => a.order - b.order)
    .map((cat) => ({
      label: cat.name,
      options: getConceptsByCategory(cat.slug).map((c) => ({ value: c.slug, label: c.name })),
    }))
    .filter((g) => g.options.length > 0)

  return (
    <Section id={sectionIds.pricing} tone="cream" labelledBy="pricing-title">
      <SectionHeading
        id="pricing-title"
        eyebrow="Bảng giá theo gói"
        title="Chọn gói chụp"
        accent="phù hợp với bạn"
        description=""
      />

      <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_26rem] xl:items-start xl:gap-10">
        {/* Cột thẻ giá bám dưới header khi cuộn trong phạm vi khối. Chỉ bám được trong phần form bên phải
            cao hơn cột thẻ — form tự xếp 1 cột khi khung hẹp (@container trong BookingForm) để đủ dài. */}
        <div className="xl:sticky xl:top-[calc(var(--header-h)+1.5rem)]">
          <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:items-center lg:gap-8 xl:gap-5">
            {packages.map((pkg, i) => {
              const hl = pkg.highlighted
              return (
                <li
                  key={pkg.id}
                  {...reveal('up', i * 110)}
                  className={`relative flex flex-col rounded-[1.75rem] border p-7 lg:p-8 xl:p-6 ${hl
                    ? 'border-ink bg-ink text-cream shadow-soft md:py-11 lg:py-12'
                    : 'border-line bg-cream text-ink'
                    }`}
                >
                  {hl && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cream">
                      Gói gợi ý
                    </span>
                  )}
                  <h3 className="font-display text-[1.75rem] font-medium leading-tight xl:text-[1.6rem]">{pkg.name}</h3>
                  <p className={`mt-1 text-sm ${hl ? 'text-cream/70' : 'text-ink-muted'}`}>{pkg.tagline}</p>

                  <p
                    className={`mt-6 border-y py-4 font-display text-[1.6rem] italic xl:text-[1.45rem] ${hl ? 'border-cream/15' : 'border-line'
                      }`}
                  >
                    {formatPrice(pkg.price)}
                  </p>

                  <ul className="mt-6 grid gap-3 text-[14.5px] xl:text-sm">
                    {pkg.includes.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${hl ? 'bg-cream/15 text-cream' : 'bg-accent-soft text-accent'
                            }`}
                        >
                          <CheckIcon size={13} strokeWidth={2} />
                        </span>
                        <span className={hl ? 'text-cream/90' : 'text-ink-soft'}>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <SelectPackageButton
                    packageId={pkg.id}
                    className={`mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-300 ${hl ? 'bg-cream text-ink hover:bg-cream-200' : 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]'
                      }`}
                  >
                    Chọn gói này
                  </SelectPackageButton>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-2xl" {...reveal('up', 200)}>
          <BookingForm
            branches={branches.map((b) => ({ value: b.id, label: b.name }))}
            conceptGroups={conceptGroups}
            packages={packages.map((p) => ({ value: p.id, label: p.name }))}
            defaultPackageId={packages.find((p) => p.highlighted)?.id ?? ''}
          />
        </div>
      </div>
    </Section>
  )
}
