// Thông tin doanh nghiệp — NGUỒN DUY NHẤT (quy tắc R3 trong AGENTS.md).
// Mọi giá trị ở đây lấy từ docs/REQUIREMENTS.md mục 2. Không hard-code các giá trị này trong component.

import type { Branch } from '@/types'

const PHONE_RAW = '0985820992'

export const siteConfig = {
  name: 'Nhà Cừu Photography',
  shortName: 'Nhà Cừu',
  /** URL gốc của website — dùng cho metadata/Open Graph. Đặt NEXT_PUBLIC_SITE_URL khi deploy. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description:
    'Nhà Cừu Photography — studio chụp ảnh Bầu, Bé, Gia đình, Beauty cùng các concept cá nhân và nghệ thuật tại TP. Hồ Chí Minh. Hai chi nhánh Thủ Đức và Gò Vấp.',
  copyrightYear: 2026,

  phone: {
    raw: PHONE_RAW,
    display: '098 582 09 92',
    tel: 'tel:+84985820992',
    e164: '+84985820992',
  },

  social: {
    zalo: `https://zalo.me/${PHONE_RAW}`,
    facebook: 'https://www.facebook.com/NhaCuuPhotography/',
    // [SUY RA] từ username Fanpage — cần kiểm tra link chạy được (REQUIREMENTS 2.4)
    messenger: 'https://m.me/NhaCuuPhotography',
  },

  logo: {
    dark: { src: '/images/logo/nha-cuu-logo.png', width: 1002, height: 344 },
    light: { src: '/images/logo/nha-cuu-logo-light.png', width: 1002, height: 344 },
  },
} as const

export const branches: Branch[] = [
  {
    id: 'thu-duc',
    name: 'CN Thủ Đức',
    shortName: 'Thủ Đức',
    address: '27 Đường số 9, Khu phố 56, Phường Linh Xuân (phường Linh Tây cũ), TP. Hồ Chí Minh',
    note: 'Bạn lưu ý tìm "Khu phố 56" khi đến nhé.',
    mapUrl: 'https://www.google.com/maps?q=10.8592999,106.7580476',
    mapEmbedUrl: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s10.8592999,106.7580476!6i16',
    geo: { lat: 10.8592999, lng: 106.7580476 },
  },
  {
    id: 'go-vap',
    name: 'CN Gò Vấp',
    shortName: 'Gò Vấp',
    address: '89 Đường số 3, Cityland Park Hills, Phường Gò Vấp, TP. Hồ Chí Minh',
    note: 'Gần LOTTE Mart, thuộc phường Gò Vấp mới.',
    // [GIẢ ĐỊNH] chưa có link Maps chính thức — dùng link tìm kiếm theo địa chỉ (REQUIREMENTS 2.3)
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('89 Đường số 3, Cityland Park Hills, Gò Vấp, TP. Hồ Chí Minh'),
    mapIsSearch: true,
  },
]

export const mainNav = [
  { href: '/', label: 'Trang chủ' },
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/concept', label: 'Concept' },
  { href: '/bang-gia', label: 'Bảng giá' },
  { href: '/bo-suu-tap', label: 'Bộ sưu tập' },
  { href: '/lien-he', label: 'Liên hệ' },
] as const

export const bookingHref = '/dat-lich'
