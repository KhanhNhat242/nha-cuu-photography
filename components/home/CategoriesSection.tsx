// F01 — Khối 2: 6 danh mục dịch vụ (thứ tự theo Google Maps, REQUIREMENTS 5.2), dạng carousel coverflow (v1.7).
// Phần tương tác nằm trong CategoryCarousel (client).
import { categories } from '@/data/categories'
import { Section, SectionHeading, reveal } from '@/components/ui/Section'
import { sectionIds } from '@/lib/site-config'
import { CategoryCarousel } from './CategoryCarousel'

export function CategoriesSection() {
  const items = [...categories]
    .sort((a, b) => a.order - b.order)
    .map((category) => ({ category }))

  return (
    <Section id={sectionIds.about} tone="cream-200" labelledBy="categories-title">
      <SectionHeading
        id="categories-title"
        eyebrow=""
        title="Concept tại"
        accent="Nhà Cừu"
        description=""
      />

      <div {...reveal('up')}>
        <CategoryCarousel items={items} />
      </div>
    </Section>
  )
}
