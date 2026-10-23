// F01 — Khối 2: 6 danh mục dịch vụ (thứ tự theo Google Maps, REQUIREMENTS 5.2)
import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/data/categories'
import { Section, SectionHeading, reveal } from '@/components/ui/Section'
import { ArrowUpRightIcon } from '@/components/ui/Icons'

export function CategoriesSection() {
  return (
    <Section tone="cream-200" labelledBy="categories-title">
      <SectionHeading
        id="categories-title"
        eyebrow="Dịch vụ"
        title="Chụp ảnh tại"
        accent="Nhà Cừu"
        description="Chọn một danh mục để xem các concept phù hợp với bạn."
      />

      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
        {[...categories]
          .sort((a, b) => a.order - b.order)
          .map((cat, i) => (
            <li key={cat.slug} {...reveal('up', (i % 3) * 110)}>
              <Link href={`/concept?danh-muc=${cat.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-cream-300">
                  <Image
                    src={cat.cover.src}
                    alt={cat.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-soft group-hover:scale-[1.04]"
                    style={{ objectPosition: cat.cover.focus ?? '50% 50%' }}
                  />
                  <span className="glass-panel absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium tabular-nums text-ink-soft md:left-4 md:top-4 md:text-xs">
                    0{cat.order}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 right-3 hidden h-11 w-11 items-center justify-center rounded-full bg-cream text-ink opacity-0 shadow-soft transition-opacity duration-500 group-hover:opacity-100 md:inline-flex"
                  >
                    <ArrowUpRightIcon size={18} />
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[1.3rem] font-medium leading-tight text-ink transition-colors group-hover:text-accent md:mt-5 md:text-[1.65rem]">
                  {cat.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted md:text-[15px]">
                  {cat.description}
                </p>
              </Link>
            </li>
          ))}
      </ul>
    </Section>
  )
}
