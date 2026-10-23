// 6 danh mục dịch vụ — REQUIREMENTS mục 5.2.
// Thứ tự hiển thị theo tên trên Google Maps: Bầu, Gia đình, Bé, Beauty, rồi Concept cá nhân, Nghệ thuật.
// PLACEHOLDER: câu mô tả ngắn do dev viết, cần khách duyệt (REQUIREMENTS 10.3).

import type { Category, CategorySlug } from '@/types'
import { getConcept } from './concepts'

function coverOf(conceptSlug: string, index: number, focus?: string) {
  const c = getConcept(conceptSlug)
  if (!c) throw new Error(`Không tìm thấy concept ${conceptSlug}`)
  const photo = c.gallery[index]
  return focus ? { ...photo, focus } : photo
}

export const categories: Category[] = [
  {
    slug: 'bau',
    name: 'Chụp ảnh Bầu',
    shortName: 'Bầu',
    description: 'Lưu lại hành trình chờ con với những khung hình nhẹ nhàng, rạng rỡ.',
    cover: coverOf('bau-thanh-xuan-ngot-ngao', 2),
    order: 1,
  },
  {
    slug: 'gia-dinh',
    name: 'Chụp ảnh Gia đình',
    shortName: 'Gia đình',
    description: 'Khoảnh khắc sum vầy của nhiều thế hệ trong không gian ấm áp.',
    cover: coverOf('gia-dinh-sum-vay-ba-the-he', 0, '56% 50%'),
    order: 2,
  },
  {
    slug: 'be',
    name: 'Chụp ảnh Bé',
    shortName: 'Bé',
    description: 'Những biểu cảm đáng yêu của bé, từ sơ sinh đến ngày tròn tuổi.',
    cover: coverOf('be-thien-than-nho-tinh-nghich', 1, '65% 50%'),
    order: 3,
  },
  {
    slug: 'beauty',
    name: 'Chụp ảnh Beauty',
    shortName: 'Beauty',
    description: 'Chân dung dịu dàng, tôn nét đẹp riêng của bạn qua từng khung hình.',
    cover: coverOf('beauty-nang-tho-ao-dai', 4),
    order: 4,
  },
  {
    slug: 'concept-ca-nhan',
    name: 'Chụp ảnh concept cá nhân',
    shortName: 'Concept cá nhân',
    description: 'Sinh nhật, lễ hội hay ý tưởng riêng, Nhà Cừu cùng bạn thực hiện.',
    cover: coverOf('giang-sinh-me-va-be', 0),
    order: 5,
  },
  {
    slug: 'nghe-thuat',
    name: 'Chụp ảnh nghệ thuật',
    shortName: 'Nghệ thuật',
    description: 'Ánh sáng và cảm xúc được kể lại bằng ngôn ngữ nhiếp ảnh tinh tế.',
    cover: coverOf('nghe-thuat-khoanh-khac-den-trang', 0),
    order: 6,
  },
]

export function getCategory(slug: CategorySlug): Category {
  const c = categories.find((x) => x.slug === slug)
  if (!c) throw new Error(`Không tìm thấy danh mục ${slug}`)
  return c
}
