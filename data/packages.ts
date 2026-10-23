// Gói chụp — REQUIREMENTS F05.
// Chưa có giá thật → price: null → hiển thị "Liên hệ báo giá" (quy tắc R2.4).
// PLACEHOLDER: quyền lợi từng gói do dev soạn để dựng giao diện, chờ khách cung cấp (REQUIREMENTS 10.3).

import type { PricePackage } from '@/types'

export const packages: PricePackage[] = [
  {
    id: 'co-ban',
    name: 'Gói Cơ bản',
    tagline: 'Nhẹ nhàng cho lần đầu ghé Nhà Cừu',
    price: null,
    includes: [
      'Chụp 1 concept tại studio',
      '1 bộ trang phục theo concept',
      'Ảnh chỉnh sửa chọn lọc',
      'Tư vấn concept qua Zalo',
    ],
    placeholder: true,
  },
  {
    id: 'tieu-chuan',
    name: 'Gói Tiêu chuẩn',
    tagline: 'Cân bằng cho mẹ bầu và gia đình',
    price: null,
    includes: [
      'Chụp 2 concept tại studio',
      '2 bộ trang phục theo concept',
      'Hỗ trợ make-up và làm tóc',
      'Ảnh chỉnh sửa chọn lọc',
    ],
    highlighted: true,
    placeholder: true,
  },
  {
    id: 'cao-cap',
    name: 'Gói Cao cấp',
    tagline: 'Trọn vẹn cho những dịp đặc biệt',
    price: null,
    includes: [
      'Kết hợp nhiều concept',
      'Trang phục theo từng concept',
      'Make-up và làm tóc trọn buổi',
      'Ưu tiên chọn khung giờ chụp',
    ],
    placeholder: true,
  },
]
