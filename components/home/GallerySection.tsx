// F01 — Khối 6: Bộ sưu tập ảnh chọn lọc (masonry 8 ảnh + ô "Xem thêm" 30 ảnh trong lightbox)
import { homeGallery, homeGalleryMore } from '@/data/home'
import { Section, SectionHeading, reveal } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { GalleryMasonry } from '@/components/gallery/GalleryMasonry'
import { sectionIds } from '@/lib/site-config'

export function GallerySection() {
  return (
    <Section ornaments="gallery" id={sectionIds.gallery} tone="cream-200" labelledBy="gallery-title">
      <SectionHeading
        id="gallery-title"
        eyebrow="Bộ sưu tập"
        title="Khoảnh khắc tại"
        accent="Nhà Cừu"
        description="Mỗi bức ảnh là một câu chuyện kỷ niệm đáng nhớ."
      />

      <GalleryMasonry photos={homeGallery} more={homeGalleryMore} />
    </Section>
  )
}
