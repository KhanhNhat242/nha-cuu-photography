// F01 — Khối 3: Concept nổi bật (4–8 thẻ), mỗi thẻ có "Xem chi tiết" và "Chọn concept" (F07)
import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedConcepts } from '@/data/concepts'
import { getCategory } from '@/data/categories'
import { Section, SectionHeading, reveal } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { SelectConceptButton } from '@/components/concept/SelectConceptButton'
import { sectionIds } from '@/lib/site-config'

export function FeaturedConceptsSection() {
  const featured = getFeaturedConcepts().slice(0, 8)

  return (
    <Section id={sectionIds.concepts} tone="cream" labelledBy="featured-title">
      <SectionHeading
        id="featured-title"
        eyebrow="Concept nổi bật"
        title="Chọn phong cách"
        accent="bạn yêu thích"
        description="Bấm “Chọn concept” để lưu lại những phong cách bạn thích, rồi đặt lịch một lần cho tất cả."
      />

      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
        {featured.map((concept, i) => {
          const category = getCategory(concept.category)
          const href = `/concept/${concept.slug}`
          return (
            <li key={concept.slug} {...reveal('up', (i % 4) * 100)}>
              <article className="group flex h-full flex-col">
                <Link
                  href={href}
                  className="relative block aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-cream-300"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={concept.cover.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 290px, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-soft group-hover:scale-[1.05]"
                    style={{ objectPosition: concept.cover.focus ?? '50% 50%' }}
                  />
                  <span className="glass-panel absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium text-ink-soft">
                    {category.shortName}
                  </span>
                </Link>

                <h3 className="mt-4 font-display text-[1.25rem] font-medium leading-tight text-ink md:text-[1.45rem]">
                  <Link href={href} className="transition-colors hover:text-accent">
                    <span className="sr-only">{category.shortName} – </span>
                    {concept.name}
                  </Link>
                </h3>
                <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-muted md:text-sm">
                  {concept.summary}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-4">
                  <SelectConceptButton slug={concept.slug} name={concept.name} />
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    Xem chi tiết
                    <span className="sr-only"> concept {concept.name}</span>
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </article>
            </li>
          )
        })}
      </ul>

      <div className="mt-12 flex justify-center md:mt-16" {...reveal('up')}>
        <ButtonLink href="/concept" variant="outline" size="lg">
          Xem tất cả concept
          <ArrowRightIcon size={18} />
        </ButtonLink>
      </div>
    </Section>
  )
}
