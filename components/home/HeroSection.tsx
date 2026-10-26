// F01 — Khối 1: Hero carousel ảnh nền toàn khung, vừa đúng 1 màn hình, nằm dưới header trong suốt (REQUIREMENTS F01, v1.6).
// Phần tương tác (phóng to thẻ, tự chạy) nằm trong HeroCarousel (client).
import { hero } from '@/data/home'
import { bookingHref, sectionHref, sectionIds } from '@/lib/site-config'
import { HeroCarousel } from './HeroCarousel'

export function HeroSection() {
  return (
    <HeroCarousel
      id={sectionIds.hero}
      slides={hero.slides}
      headline={hero.headline}
      description={hero.description}
      delay={hero.autoplayDelay}
      bookingHref={bookingHref}
      conceptsHref={sectionHref(sectionIds.concepts)}
    />
  )
}
