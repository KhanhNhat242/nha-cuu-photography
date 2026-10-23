// Nội dung trang chủ (F01) — đặc tả chi tiết ở REQUIREMENTS mục 8 / F01.
// Ảnh tham chiếu lại ảnh trong data/concepts.ts (REQUIREMENTS 10.2.1), không nhân bản.

import type { Photo } from '@/types'
import { getConcept } from './concepts'

function pick(conceptSlug: string, index: number, focus?: string): Photo {
  const c = getConcept(conceptSlug)
  if (!c) throw new Error(`Không tìm thấy concept ${conceptSlug}`)
  const p = c.gallery[index]
  return focus ? { ...p, focus } : p
}

export const hero = {
  eyebrow: 'Studio ảnh tại TP. Hồ Chí Minh',
  titleLead: 'Lưu giữ khoảnh khắc',
  titleAccent: 'dịu dàng',
  titleTail: 'cùng',
  titleBrand: 'Nhà Cừu', // hiển thị không ngắt dòng
  description:
    'Không gian nhiếp ảnh ấm áp chuyên chụp Bầu, Bé, Gia đình cùng các concept cá nhân và nghệ thuật tại TP.HCM.',
  /** 3 khung vòm ghép lệch tầng (REQUIREMENTS F01 khối 1) */
  photos: {
    main: pick('beauty-nang-tho-ao-dai', 0, '50% 30%'), // nàng thơ áo dài hồng thưởng trà
    left: pick('bau-nang-tho-trang', 1, '50% 35%'), // mẹ bầu hạnh phúc
    right: pick('gia-dinh-giang-sinh-am-ap', 1, '50% 45%'), // gia đình 4 người bên cây thông
  },
}

/** 4 điểm mạnh — chỉ các ý có căn cứ từ phiếu (REQUIREMENTS 4.3). Không thêm số liệu. */
export const strengths = [
  {
    icon: 'branches',
    title: 'Hai chi nhánh thuận tiện',
    text: 'Có mặt tại cả Thủ Đức và Gò Vấp, TP. Hồ Chí Minh.',
  },
  {
    icon: 'camera',
    title: 'Dịch vụ chuyên sâu',
    text: 'Chuyên chụp ảnh Bầu, Beauty, Bé và Gia đình.',
  },
  {
    icon: 'sparkle',
    title: 'Đa dạng ý tưởng',
    text: 'Nhiều concept cá nhân, nghệ thuật và chụp sinh nhật trẻ trung.',
  },
  {
    icon: 'chat',
    title: 'Hỗ trợ nhanh chóng',
    text: 'Đặt lịch online tiện lợi, tư vấn tận tình qua Zalo và Messenger.',
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

export const ogImage = pick('beauty-nang-tho-ao-dai', 0)
