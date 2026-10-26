// F01 — Khối 8: Banner kêu gọi đặt lịch, tách biệt trước footer
import Image from 'next/image'
import { siteConfig, sectionIds } from '@/lib/site-config'
import { Section, reveal } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon, PhoneIcon, ZaloIcon } from '@/components/ui/Icons'
import { WoolLine } from '@/components/ui/WoolLine'

export function BookingCtaSection() {
  return (
    <Section id={sectionIds.booking} tone="cream" divider={false} className="pt-0! pb-20! md:pb-24! lg:pb-28!" labelledBy="cta-title">
      <div
        {...reveal('up')}
        className="paper-grain relative overflow-hidden rounded-[2rem] border border-line bg-cream-200 px-6 py-14 text-center md:rounded-[2.5rem] md:px-12 md:py-20"
      >
        <WoolLine className="deco-float pointer-events-none absolute -left-12 -top-6 w-48 text-line-strong md:w-72" />
        <WoolLine className="pointer-events-none absolute -bottom-10 -right-10 w-48 rotate-180 text-line-strong md:w-72" />

        <div className="relative mx-auto max-w-2xl">
          <Image
            src="/images/logo/sheep-head.png"
            alt=""
            width={242}
            height={217}
            sizes="44px"
            className="mx-auto h-auto w-10 opacity-85 md:w-11"
          />
          <h2
            id="cta-title"
            className="mt-6 font-display text-[2.1rem] font-medium leading-[1.12] text-ink md:text-[3rem]"
          >
            Sẵn sàng lưu giữ kỷ niệm đẹp <br className="hidden sm:block" />
            <em className="font-normal italic text-accent">của riêng bạn?</em>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-muted md:text-base">
            Chọn concept yêu thích và gửi yêu cầu để Nhà Cừu tư vấn chi tiết ngay hôm nay.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="/dat-lich" size="lg">
              Đặt lịch chụp ngay
              <ArrowRightIcon size={18} />
            </ButtonLink>
            <ButtonLink href={siteConfig.social.zalo} variant="outline" size="lg">
              <ZaloIcon size={22} className="text-zalo" />
              Nhắn Zalo
            </ButtonLink>
            <ButtonLink href={siteConfig.phone.tel} variant="outline" size="lg">
              <PhoneIcon size={18} />
              Gọi {siteConfig.phone.display}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  )
}
