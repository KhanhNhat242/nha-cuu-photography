// F01 — Khối 1: Hero (vừa đúng 1 màn hình trừ header).
// Trái 5/12: thương hiệu, tiêu đề, mô tả, 2 nút. Phải 7/12: 3 khung vòm ghép lệch tầng.
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { hero } from '@/data/home'
import { branches, siteConfig } from '@/lib/site-config'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon, MapPinIcon, PhoneIcon } from '@/components/ui/Icons'
import { WoolLine } from '@/components/ui/WoolLine'
import type { Photo } from '@/types'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

function ArchPhoto({
  photo,
  className,
  sizes,
  preload = false,
  style,
}: {
  photo: Photo
  className: string
  sizes: string
  preload?: boolean
  style?: CSSProperties
}) {
  return (
    <figure
      style={style}
      className={`absolute overflow-hidden rounded-t-full rounded-b-[1.75rem] border-[5px] border-cream bg-cream-300 shadow-soft lg:border-[6px] ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        loading={preload ? undefined : 'eager'}
        className="object-cover"
        style={{ objectPosition: photo.focus ?? '50% 50%' }}
      />
    </figure>
  )
}

/** Con dấu tròn xoay chậm: chữ chạy vòng quanh đầu chú cừu */
function BrandStamp({ className }: { className: string }) {
  return (
    <div className={`absolute ${className}`} aria-hidden="true">
      <div className="relative aspect-square w-full rounded-full border border-line bg-cream/90 shadow-soft backdrop-blur-sm">
        <svg viewBox="0 0 120 120" className="anim-spin absolute inset-0 h-full w-full text-ink-soft">
          <defs>
            <path id="stamp-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
          </defs>
          <text fontSize="8.4" fill="currentColor" style={{ fontFamily: 'var(--font-be-vietnam)' }}>
            {/* textLength = chu vi đường tròn (2π·44 ≈ 276) để chữ phủ vừa đủ một vòng */}
            <textPath href="#stamp-circle" textLength="274" lengthAdjust="spacing">
              NHÀ CỪU PHOTOGRAPHY • THỦ ĐỨC • GÒ VẤP •
            </textPath>
          </text>
        </svg>
        <Image
          src="/images/logo/sheep-head.png"
          alt=""
          width={242}
          height={217}
          sizes="48px"
          className="absolute left-1/2 top-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  )
}

export function HeroSection() {
  const { photos } = hero
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-cream">
      {/* Nền trang trí */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18%] -top-[30%] hidden aspect-square w-[62%] rounded-full bg-cream-200 lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 aspect-square w-72 rounded-full bg-accent-soft/50 blur-3xl"
      />
      <WoolLine className="deco-float pointer-events-none absolute -left-20 -top-4 hidden w-52 text-line-strong/80 lg:block xl:w-60" />

      <div className="container-page relative grid h-[calc(100svh-var(--header-h))] min-h-[600px] grid-rows-[auto_minmax(0,1fr)] gap-6 pb-6 pt-7 sm:pt-10 lg:max-h-[980px] lg:min-h-[640px] lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-10 lg:py-8">
        {/* Cột chữ */}
        <div className="lg:col-span-5 lg:pb-6">
          <p
            className="anim-rise flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-accent sm:text-xs"
            style={delay(0)}
          >
            <span className="h-px w-8 bg-accent/40" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="anim-rise mt-4 font-display text-[2.55rem] font-medium leading-[1.04] tracking-[-0.01em] text-ink sm:text-[3.4rem] lg:mt-6 lg:text-[3.9rem] xl:text-[4.5rem]"
            style={delay(90)}
          >
            {hero.titleLead}{' '}
            <em className="font-normal italic text-accent">{hero.titleAccent}</em>
            <br /> {hero.titleTail} <span className="whitespace-nowrap">{hero.titleBrand}</span>
          </h1>

          <p
            className="anim-rise mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted sm:text-base lg:mt-6 lg:text-[17px]"
            style={delay(180)}
          >
            {hero.description}
          </p>

          <div className="anim-rise mt-6 flex flex-wrap gap-3 lg:mt-9" style={delay(270)}>
            <ButtonLink href="/dat-lich" size="lg">
              Đặt lịch chụp
              <ArrowRightIcon size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/concept" size="lg" variant="outline">
              Xem concept
            </ButtonLink>
          </div>

          <ul
            className="anim-rise mt-10 hidden flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-muted sm:flex"
            style={delay(360)}
          >
            <li className="flex items-center gap-2">
              <MapPinIcon size={17} className="text-accent" />
              {branches.map((b) => b.shortName).join(' · ')}
            </li>
            <li className="h-4 w-px bg-line-strong" aria-hidden="true" />
            <li>
              <a href={siteConfig.phone.tel} className="flex items-center gap-2 transition-colors hover:text-ink">
                <PhoneIcon size={17} className="text-accent" />
                {siteConfig.phone.display}
              </a>
            </li>
          </ul>
        </div>

        {/* Cụm 3 khung vòm */}
        <div className="relative min-h-0 lg:col-span-7 lg:h-full">
          <div className="relative mx-auto aspect-[9/10] h-full max-h-[760px] max-w-full">
            {/* viền vòm trang trí lệch phía sau ảnh chính */}
            <div
              aria-hidden="true"
              className="absolute left-[28%] top-[0.5%] h-[88%] w-[50%] rounded-t-full rounded-b-[1.75rem] border border-line-strong"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-[6%] left-[6%] aspect-square w-[40%] rounded-full bg-cream-200"
            />

            <ArchPhoto
              photo={photos.main}
              preload
              sizes="(min-width: 1024px) 30vw, 52vw"
              className="anim-settle left-[25%] top-[4%] z-10 h-[88%] w-[50%]"
            />
            <ArchPhoto
              photo={photos.left}
              sizes="(min-width: 1024px) 19vw, 32vw"
              className="anim-rise bottom-[4%] left-0 z-20 h-[54%] w-[31%]"
              style={delay(260)}
            />
            <ArchPhoto
              photo={photos.right}
              sizes="(min-width: 1024px) 19vw, 32vw"
              className="anim-rise right-0 top-0 z-20 h-[52%] w-[31%]"
              style={delay(380)}
            />

            <p
              className="anim-rise glass-panel absolute bottom-[1%] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-line px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft shadow-soft sm:text-xs"
              style={delay(500)}
            >
              Bầu · Bé · Gia đình · Beauty
            </p>

            <BrandStamp className="bottom-[8%] right-[1%] z-30 hidden w-[19%] min-w-[88px] sm:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
