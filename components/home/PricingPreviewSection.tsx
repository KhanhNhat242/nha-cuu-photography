// F01 — Khối 5: hai phần — trên: 3 thẻ bảng giá; dưới: form gửi yêu cầu đặt lịch (F08).
// Chưa có giá thật → "Liên hệ báo giá" (R2.4). Nút "Chọn gói này" điền sẵn gói vào form, không chuyển trang.
import Image from 'next/image'
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
    <Section ornaments="pricing" id={sectionIds.pricing} tone="cream" labelledBy="pricing-title">
      <SectionHeading
        id="pricing-title"
        eyebrow="Bảng giá theo gói"
        title="Chọn gói chụp"
        accent="phù hợp với bạn"
        description=""
      />

      {/* Phần 1: 3 thẻ bảng giá */}
      <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:items-center lg:gap-8">
        {packages.map((pkg, i) => {
          const hl = pkg.highlighted
          return (
            <li
              key={pkg.id}
              {...reveal('up', i * 110)}
              className={`relative flex flex-col rounded-[1.75rem] border p-7 lg:p-8 ${hl
                ? 'border-ink bg-ink text-cream shadow-soft md:py-11 lg:py-12'
                : 'border-line bg-cream text-ink'
                }`}
            >
              {hl && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cream">
                  Phổ biến
                </span>
              )}
              <h3 className="font-display text-[1.75rem] font-medium leading-tight">{pkg.name}</h3>
              <p className={`mt-1 text-sm ${hl ? 'text-cream/70' : 'text-ink-muted'}`}>{pkg.tagline}</p>

              <p
                className={`mt-6 border-y py-4 font-display text-[1.6rem] italic ${hl ? 'border-cream/15' : 'border-line'
                  }`}
              >
                {formatPrice(pkg.price)}
              </p>

              <ul className="mt-6 grid gap-3 text-[14.5px]">
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

      {/* Phần 2: form đặt lịch trên nền ảnh booking-banner — nút "Chọn gói này" ở trên điền sẵn gói và cuộn xuống đây */}
      {/* Desktop: tràn hết bề ngang màn hình (margin âm bằng phần lề ngoài container), sát đáy section */}
      <div id="dat-lich" className="relative isolate mt-20 overflow-hidden rounded-[2rem] px-4 py-14 sm:px-8 md:mt-24 md:py-20 lg:-mb-28 lg:mx-[calc(50%-50vw)] lg:rounded-none lg:py-24">
        <Image
          src="/images/gallery/booking-banner.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        {/* lớp phủ nâu ấm để tiêu đề chữ kem và form đọc rõ trên nền ảnh ghép nhiều màu */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/75" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/40 via-transparent to-ink/50" />

        <SectionHeading
          className="[&_em]:text-accent-soft [&_h2]:text-cream [&_p]:text-cream/80"
          id="boom"
          eyebrow="Đặt lịch chụp"
          title="Hẹn lịch chụp"
          accent="cùng Nhà Cừu"
          description="Điền thông tin bên dưới, Nhà Cừu sẽ liên hệ xác nhận lịch qua điện thoại / Zalo."
        />
        <div className="mx-auto w-full max-w-3xl" {...reveal('up', 120)}>
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
