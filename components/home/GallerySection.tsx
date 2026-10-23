// F01 — Khối 6: Bộ sưu tập ảnh chọn lọc (masonry 8 ảnh + lightbox)
import { homeGallery } from '@/data/home'
import { Section, SectionHeading, reveal } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { GalleryMasonry } from '@/components/gallery/GalleryMasonry'

export function GallerySection() {
  return (
    <Section tone="cream-200" labelledBy="gallery-title">
      <SectionHeading
        id="gallery-title"
        eyebrow="Bộ sưu tập"
        title="Khoảnh khắc tại"
        accent="Nhà Cừu"
        description="Mỗi bức ảnh là một câu chuyện kỷ niệm đáng nhớ."
      />

      <GalleryMasonry photos={homeGallery} />

      <div className="mt-6 flex justify-center md:mt-10" {...reveal('up')}>
        <ButtonLink href="/bo-suu-tap" variant="outline" size="lg">
          Xem toàn bộ bộ sưu tập
          <ArrowRightIcon size={18} />
        </ButtonLink>
      </div>
    </Section>
  )
}
