// F01 — Trang chủ. Thứ tự 8 khối theo REQUIREMENTS mục 8 / F01.
import { HeroSection } from '@/components/home/HeroSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { FeaturedConceptsSection } from '@/components/home/FeaturedConceptsSection'
import { StrengthsSection } from '@/components/home/StrengthsSection'
import { PricingPreviewSection } from '@/components/home/PricingPreviewSection'
import { GallerySection } from '@/components/home/GallerySection'
import { BranchesSection } from '@/components/home/BranchesSection'
import { BookingCtaSection } from '@/components/home/BookingCtaSection'
import { branches, siteConfig } from '@/lib/site-config'

/** JSON-LD LocalBusiness cho 2 chi nhánh — chỉ dữ liệu thật (REQUIREMENTS 11) */
function LocalBusinessJsonLd() {
  const data = branches.map((b) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${siteConfig.name} - ${b.shortName}`,
    telephone: siteConfig.phone.e164,
    url: siteConfig.url,
    sameAs: [siteConfig.social.facebook],
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.address,
      addressLocality: 'TP. Hồ Chí Minh',
      addressCountry: 'VN',
    },
    ...(b.geo ? { geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng } } : {}),
  }))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HeroSection />
      <CategoriesSection />
      <FeaturedConceptsSection />
      <StrengthsSection />
      <PricingPreviewSection />
      <GallerySection />
      <BranchesSection />
      <BookingCtaSection />
    </>
  )
}
