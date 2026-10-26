// Nội dung trang chủ (F01) — đặc tả chi tiết ở REQUIREMENTS mục 8 / F01.
// Ảnh tham chiếu lại ảnh trong data/concepts.ts (REQUIREMENTS 10.2.1), không nhân bản.

import type { Photo } from '@/types'
import { concepts, getConcept } from './concepts'

function pick(conceptSlug: string, index: number, focus?: string): Photo {
  const c = getConcept(conceptSlug)
  if (!c) throw new Error(`Không tìm thấy concept ${conceptSlug}`)
  const p = c.gallery[index]
  return focus ? { ...p, focus } : p
}

export interface HeroSlide {
  photo: Photo
  /** nhãn nhỏ phía trên tiêu đề */
  eyebrow: string
  title: string
  /** object-position khi ảnh ngang bị cắt vào thẻ dọc / màn hình dọc */
  cardFocus: string
}

function heroPhoto(n: number, alt: string, focus: string): Photo {
  return { src: `/images/hero/hero-0${n}.jpg`, width: 2048, height: 1365, alt, focus }
}

export const hero = {
  /** dòng h1 — thương hiệu */
  headline: 'Lưu giữ khoảnh khắc dịu dàng cùng Nhà Cừu',
  description:
    'Không gian nhiếp ảnh ấm áp chuyên chụp Bầu, Bé, Gia đình cùng các concept cá nhân và nghệ thuật tại TP.HCM.',
  /** Thời gian chờ trước khi carousel tự phóng to ảnh kế tiếp (ms) */
  autoplayDelay: 6500,
  /**
   * 5 ảnh carousel (REQUIREMENTS F01 khối 1, v1.5).
   * PLACEHOLDER: nhãn và tiêu đề do dev viết theo nội dung ảnh, cần khách duyệt (REQUIREMENTS 10.3).
   */
  slides: [
    {
      photo: heroPhoto(1, 'Bố mẹ nâng bé gái đội vòng hoa lên cao trên phông đen, cả nhà cười rạng rỡ', '50% 40%'),
      eyebrow: 'Chụp ảnh Gia đình',
      title: 'Khoảnh khắc bên con',
      cardFocus: '45% 50%',
    },
    {
      photo: heroPhoto(2, 'Bé gái váy hồng vịn hộp trắng giữa vườn hoa, bên cạnh bảng chúc mừng sinh nhật', '60% 50%'),
      eyebrow: 'Sinh nhật cho bé',
      title: 'Thôi nôi vườn hoa',
      cardFocus: '62% 50%',
    },
    {
      photo: heroPhoto(3, 'Vợ chồng tựa trán vào nhau, mẹ bầu cài hoa trên tóc ngồi trên sofa trắng', '40% 50%'),
      eyebrow: 'Chụp ảnh Bầu',
      title: 'Chờ con yêu',
      cardFocus: '30% 50%',
    },
    {
      photo: heroPhoto(4, 'Đại gia đình ba thế hệ đứng quanh bé trai trên bục trắng, trang phục tông xanh xám', '55% 50%'),
      eyebrow: 'Gia đình ba thế hệ',
      title: 'Sum vầy bên nhau',
      cardFocus: '55% 50%',
    },
    {
      photo: heroPhoto(5, 'Bé sơ sinh cười tươi trong áo choàng bông trắng, kính tròn gài trên mũ, nằm trên ổ lông', '60% 45%'),
      eyebrow: 'Chụp ảnh Bé',
      title: 'Nụ cười đầu đời',
      cardFocus: '62% 50%',
    },
  ] satisfies HeroSlide[],
}

/**
 * 4 điểm mạnh — chỉ các ý có căn cứ từ phiếu (REQUIREMENTS 4.3). Không thêm số liệu.
 * Ảnh minh họa chọn từ kho ảnh đã chuẩn hóa (ảnh chưa dùng ở khối khác trên trang chủ).
 */
export const strengths = [
  {
    icon: 'branches',
    title: 'Hai chi nhánh thuận tiện',
    text: 'Có mặt tại cả Thủ Đức và Gò Vấp, TP. Hồ Chí Minh.',
    photo: pick('gia-dinh-sum-vay-ba-the-he', 3, '50% 45%'),
  },
  {
    icon: 'camera',
    title: 'Dịch vụ chuyên sâu',
    text: 'Chuyên chụp ảnh Bầu, Beauty, Bé và Gia đình.',
    photo: pick('beauty-nang-tho-ao-dai', 1, '50% 30%'),
  },
  {
    icon: 'sparkle',
    title: 'Đa dạng ý tưởng',
    text: 'Nhiều concept cá nhân, nghệ thuật và chụp sinh nhật trẻ trung.',
    photo: pick('sinh-nhat-quy-ong-nhi', 1, '50% 40%'),
  },
  {
    icon: 'chat',
    title: 'Hỗ trợ nhanh chóng',
    text: 'Đặt lịch online tiện lợi, tư vấn tận tình qua Zalo và Messenger.',
    photo: pick('bau-giang-sinh-do', 3, '50% 40%'),
  },
] as const

/**
 * 8 ảnh bộ sưu tập trang chủ — thứ tự đã tính sẵn cho components/gallery/GalleryMasonry.tsx:
 * - Desktop 3 cột: [1,2,3] [4,5,6] [7,8] → ảnh ngang ở đầu cột 1 và cuối cột 2 (chéo nhau).
 * - Mobile 2 cột: [1–4] [5–8] → ảnh ngang ở hàng 1 cột trái và hàng 2 cột phải, hai cột cao bằng nhau.
 */
export const homeGallery: Photo[] = [
  pick('gia-dinh-sum-vay-ba-the-he', 1), // ảnh ngang: đại gia đình
  pick('gia-dinh-canh-xuan-tinh-khoi', 0),
  pick('bau-anh-lua-vang', 0),
  pick('nghe-thuat-tong-toi-am-ap', 0),
  pick('bau-jeans-toi-gian', 0),
  pick('be-thien-than-nho-tinh-nghich', 2), // ảnh ngang: bé đeo kính
  pick('sinh-nhat-hong-ngot-ngao', 1),
  pick('gia-dinh-lua-nga-diu-dang', 1),
]

/** Xáo trộn có hạt giống cố định: "ngẫu nhiên" nhưng giống nhau mỗi lần build → không lệch hydration */
function seededShuffle<T>(list: T[], seed: number): T[] {
  const out = [...list]
  let t = seed
  const rand = () => {
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * 30 ảnh xem thêm trong lightbox bộ sưu tập (nút "Xem thêm" cuối lưới).
 * Chọn ngẫu nhiên (cố định) từ kho ảnh đã chuẩn hóa — không trùng 8 ảnh đang hiện.
 */
export const homeGalleryMore: Photo[] = seededShuffle(
  concepts.flatMap((c) => c.gallery).filter((p) => !homeGallery.some((h) => h.src === p.src)),
  2610,
).slice(0, 30)

export const ogImage = pick('beauty-nang-tho-ao-dai', 0)
