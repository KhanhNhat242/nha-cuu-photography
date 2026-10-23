// Danh sách concept — ảnh là ảnh thật từ Drive (public/images/concepts/<slug>/).
// PLACEHOLDER: tên và mô tả concept do dev đặt theo nội dung ảnh, chưa được khách xác nhận
// (REQUIREMENTS 10.3). Giữ cờ `placeholder: true` cho tới khi khách duyệt.

import type { CategorySlug, Concept, Photo } from '@/types'

const P = 1365 // ảnh dọc 1365×2048
const L = 2048 // ảnh ngang 2048×1365

function photo(slug: string, n: number, alt: string, orientation: 'p' | 'l', focus?: string): Photo {
  const file = String(n).padStart(2, '0')
  return {
    src: `/images/concepts/${slug}/${file}.jpg`,
    width: orientation === 'p' ? P : L,
    height: orientation === 'p' ? 2048 : 1365,
    alt,
    focus,
  }
}

type ConceptInput = Omit<Concept, 'cover' | 'gallery' | 'branches' | 'packageIds' | 'placeholder'> & {
  photos: Array<[alt: string, orientation: 'p' | 'l', focus?: string]>
  coverIndex?: number
}

function concept(input: ConceptInput): Concept {
  const { photos, coverIndex = 0, ...rest } = input
  const gallery = photos.map(([alt, o, focus], i) => photo(input.slug, i + 1, alt, o, focus))
  return {
    ...rest,
    cover: gallery[coverIndex],
    gallery,
    branches: ['thu-duc', 'go-vap'],
    packageIds: ['co-ban', 'tieu-chuan', 'cao-cap'],
    placeholder: true,
  }
}

export const concepts: Concept[] = [
  concept({
    slug: 'bau-thanh-xuan-ngot-ngao',
    name: 'Thanh xuân ngọt ngào',
    category: 'bau',
    featured: true,
    summary: 'Tông pastel xanh trong trẻo, sofa êm và gấu bông cho hai vợ chồng.',
    description:
      'Concept bầu tông pastel xanh nhẹ nhàng với sofa, gối bông và thú nhồi bông, lưu lại niềm vui chờ con của hai vợ chồng.',
    photos: [
      ['Mẹ bầu và chồng mặc đồ pastel xanh ngồi trên sofa cùng gấu bông', 'p'],
      ['Vợ chồng tựa vào nhau trong concept bầu tông xanh pastel', 'p'],
      ['Mẹ bầu và chồng đứng cạnh nhau, trang phục xanh pastel', 'p'],
    ],
  }),
  concept({
    slug: 'gia-dinh-giang-sinh-am-ap',
    name: 'Giáng sinh ấm áp',
    category: 'gia-dinh',
    featured: true,
    summary: 'Áo len trắng, cây thông và tuyết trắng cho cả nhà cùng đón Noel.',
    description:
      'Khung cảnh Giáng sinh tuyết trắng với cây thông, người tuyết và áo len đồng điệu, cho khoảnh khắc sum vầy cuối năm.',
    photos: [
      ['Gia đình bốn người mặc áo len trắng vui đùa bên cây thông', 'p'],
      ['Bố mẹ và hai con đứng cạnh cây thông Noel trong tuyết trắng', 'p'],
      ['Gia đình mặc áo len trắng cười đùa bên người tuyết', 'p'],
      ['Cả nhà ôm nhau bên cây thông trang trí', 'p'],
      ['Gia đình bốn người trong khung cảnh Giáng sinh tuyết trắng', 'p'],
    ],
  }),
  concept({
    slug: 'be-thien-than-nho-tinh-nghich',
    name: 'Thiên thần nhỏ tinh nghịch',
    category: 'be',
    featured: true,
    summary: 'Bé sơ sinh đeo kính tròn, áo choàng bông trắng trên ổ lông mềm.',
    description:
      'Concept newborn với áo choàng bông, kính tròn và đạo cụ cổ điển, ghi lại những biểu cảm đáng yêu đầu đời của bé.',
    photos: [
      ['Bé sơ sinh cười tươi, kính tròn gài trên mũ, nằm trên ổ lông trắng', 'l', '72% 50%'],
      ['Bé sơ sinh đeo kính tròn mặc áo choàng trắng nằm trên ổ lông', 'l', '65% 50%'],
      ['Bé sơ sinh đeo kính cười híp mắt trên ổ lông', 'l', '68% 50%'],
      ['Bé sơ sinh nằm trên ổ lông trắng cạnh máy ảnh cổ', 'l', '60% 50%'],
      ['Bé mặc áo choàng và mũ trắng nằm trên ổ lông', 'l', '60% 50%'],
    ],
  }),
  concept({
    slug: 'beauty-nang-tho-ao-dai',
    name: 'Nàng thơ áo dài',
    category: 'beauty',
    featured: true,
    summary: 'Áo dài hồng, hoa cài tóc và chén trà bên phông xanh rêu.',
    description:
      'Chân dung áo dài hồng dịu dàng bên bàn trà gỗ và bình hoa, tôn nét đẹp Á Đông nhẹ nhàng, sâu lắng.',
    coverIndex: 1,
    photos: [
      ['Thiếu nữ mặc áo dài hồng thưởng trà bên bình hoa', 'p'],
      ['Thiếu nữ áo dài hồng ngồi bên bàn trà gỗ', 'p'],
      ['Thiếu nữ áo dài hồng rót trà trước phông xanh rêu', 'p'],
      ['Thiếu nữ áo dài hồng cài hoa nhìn nghiêng', 'p'],
      ['Chân dung thiếu nữ áo dài hồng cài hoa trên tóc', 'p'],
    ],
  }),
  concept({
    slug: 'bau-nang-tho-trang',
    name: 'Nàng thơ trắng',
    category: 'bau',
    featured: true,
    summary: 'Váy trắng ôm dáng, hoa ngọc lan và phông xanh rêu dịu mắt.',
    description:
      'Concept bầu thanh lịch với váy trắng ôm dáng, hoa trắng và phông xanh rêu, tôn vẻ rạng rỡ của mẹ trong thai kỳ.',
    photos: [
      ['Mẹ bầu váy trắng cầm cành hoa trắng trước phông xanh rêu', 'p'],
      ['Mẹ bầu váy trắng mỉm cười bên bình hoa ngọc lan', 'p'],
      ['Mẹ bầu váy trắng đứng bên bàn tròn phủ voan', 'p'],
    ],
  }),
  concept({
    slug: 'sinh-nhat-hong-ngot-ngao',
    name: 'Sinh nhật hồng ngọt ngào',
    category: 'concept-ca-nhan',
    featured: true,
    summary: 'Bóng số 1, bóng bay đỏ và thỏ bông cho tiệc thôi nôi của bé.',
    description:
      'Concept sinh nhật tông hồng với bóng số, bóng bay và ghế mây xinh xắn, lưu giữ cột mốc tròn tuổi đáng nhớ.',
    photos: [
      ['Bé gái ngồi ghế mây bên bóng số 1 và bóng bay đỏ', 'p'],
      ['Bé gái mặc yếm hồng bên bảng chúc mừng sinh nhật', 'p'],
      ['Bé gái ngồi ghế bập bênh cạnh thỏ bông và bóng số 1', 'p'],
    ],
  }),
  concept({
    slug: 'nghe-thuat-khoanh-khac-den-trang',
    name: 'Khoảnh khắc đen trắng',
    category: 'nghe-thuat',
    featured: true,
    summary: 'Ảnh đen trắng tối giản, giữ trọn cảm xúc của hai vợ chồng chờ con.',
    description:
      'Ảnh nghệ thuật đen trắng tập trung vào cử chỉ và ánh mắt, kể lại câu chuyện chờ con giản dị mà sâu lắng.',
    coverIndex: 1,
    photos: [
      ['Ảnh đen trắng chồng ôm vợ bầu từ phía sau', 'p'],
      ['Ảnh đen trắng vợ chồng ngồi tựa vào nhau', 'p'],
    ],
  }),
  concept({
    slug: 'gia-dinh-lua-nga-diu-dang',
    name: 'Lụa ngà dịu dàng',
    category: 'gia-dinh',
    featured: true,
    summary: 'Mẹ và các con gái trong váy lụa ngà, tình thân lặng lẽ mà sâu sắc.',
    description:
      'Concept gia đình tông ngà với váy lụa và sofa trắng, dành cho những khoảnh khắc thân mật giữa mẹ và các con.',
    photos: [
      ['Mẹ và hai con gái mặc váy lụa ngà ngồi trên ghế sofa trắng', 'p'],
      ['Hai con gái tựa đầu vào lòng mẹ', 'p'],
      ['Mẹ ngồi giữa, hai con gái ôm từ hai bên', 'p'],
      ['Ba mẹ con ngồi thân mật trên sofa trắng', 'p'],
    ],
  }),
  concept({
    slug: 'bau-anh-lua-vang',
    name: 'Ánh lụa vàng',
    category: 'bau',
    summary: 'Tà lụa bay trong ánh sáng vàng ấm, tôn dáng mẹ bầu mềm mại.',
    description:
      'Concept bầu với tà lụa bay và ánh sáng vàng ấm, tạo cảm giác mơ màng, nữ tính cho bộ ảnh của mẹ.',
    photos: [
      ['Mẹ bầu váy trắng với tà lụa vàng bay bên cột trang trí', 'p'],
      ['Mẹ bầu ôm bụng bầu trong ánh sáng vàng ấm', 'p'],
      ['Mẹ bầu đứng cạnh bình hoa, tà lụa vàng trải dài', 'p'],
    ],
  }),
  concept({
    slug: 'bau-giang-sinh-do',
    name: 'Giáng sinh đỏ',
    category: 'bau',
    summary: 'Phông đỏ rực, cây thông và quà tặng cho mùa lễ hội của hai vợ chồng.',
    description:
      'Concept bầu mùa lễ hội với phông đỏ, cây thông và hộp quà, cho bộ ảnh vui tươi, ấm cúng cuối năm.',
    photos: [
      ['Vợ chồng mặc áo len trắng ngồi trước phông đỏ và cây thông Noel', 'p'],
      ['Vợ chồng khoe bụng bầu bên cây thông và hộp quà Giáng sinh', 'l'],
      ['Chồng ôm vợ bầu từ phía sau trong khung cảnh Giáng sinh đỏ', 'l'],
      ['Mẹ bầu cười rạng rỡ bên chồng giữa tuyết trắng và quà Noel', 'l'],
    ],
  }),
  concept({
    slug: 'bau-jeans-toi-gian',
    name: 'Jeans tối giản',
    category: 'bau',
    summary: 'Áo đen, quần jeans và tấm ảnh siêu âm, giản dị mà nhiều cảm xúc.',
    description:
      'Concept bầu tối giản trên phông trắng với áo đen và quần jeans, để cảm xúc của hai vợ chồng là điểm nhấn.',
    photos: [
      ['Vợ chồng mặc jeans cầm ảnh siêu âm trước phông trắng', 'p'],
      ['Vợ chồng mặc jeans tựa trán vào nhau', 'p'],
    ],
  }),
  concept({
    slug: 'gia-dinh-sum-vay-ba-the-he',
    name: 'Sum vầy ba thế hệ',
    category: 'gia-dinh',
    summary: 'Ông bà, con cháu quây quần trong phông be cổ điển, tông xanh xám thanh lịch.',
    description:
      'Ảnh đại gia đình nhiều thế hệ với phông be cổ điển, bàn gỗ và hoa, trang phục đồng điệu tông xanh xám.',
    photos: [
      ['Đại gia đình ba thế hệ trang phục xanh xám trước phông be', 'l', '56% 50%'],
      ['Ông bà ngồi giữa, con cháu đứng quanh trong ảnh đại gia đình', 'l'],
      ['Đại gia đình đứng quanh em bé trên bục trắng', 'l'],
      ['Ông bà mặc trang phục thanh lịch ngồi bên bàn gỗ cổ điển', 'l'],
    ],
  }),
  concept({
    slug: 'gia-dinh-canh-xuan-tinh-khoi',
    name: 'Cành xuân tinh khôi',
    category: 'gia-dinh',
    summary: 'Phông trắng, cành cây mảnh và váy trắng, nhẹ nhàng như một trang tạp chí.',
    description:
      'Concept gia đình tối giản trên phông trắng với cành cây trang trí, váy trắng dài và vest xám thanh lịch.',
    photos: [
      ['Bố mẹ nâng bé lên cao, mẹ mặc váy trắng dài bên cành cây', 'p'],
      ['Gia đình bốn người đứng dưới cành cây trước phông trắng', 'p'],
      ['Mẹ bế bé ngồi trên bục trắng cùng bố và con trai', 'p'],
      ['Gia đình mặc váy trắng và vest xám trong concept tối giản', 'p'],
      ['Mẹ, bé gái và bố đứng cạnh bục trắng, cậu con trai ngồi phía trước', 'p'],
    ],
  }),
  concept({
    slug: 'be-giang-sinh-tuyet-trang',
    name: 'Giáng sinh tuyết trắng',
    category: 'be',
    summary: 'Bé trong bộ đồ trắng giữa cây thông, thỏ bông và tuyết.',
    description:
      'Concept Giáng sinh cho bé với cây thông phủ tuyết, thỏ bông và tông trắng tinh khôi.',
    photos: [
      ['Bé ngồi giữa tuyết trắng cạnh cây thông và thỏ bông', 'l'],
      ['Bé đội mũ len trắng bên cây thông Noel', 'l'],
      ['Bé ngồi dưới cây thông Noel phủ tuyết', 'p'],
      ['Bé sơ sinh bên cây thông và thỏ bông trắng', 'l'],
    ],
  }),
  concept({
    slug: 'sinh-nhat-vuon-hoa',
    name: 'Sinh nhật vườn hoa',
    category: 'concept-ca-nhan',
    summary: 'Phông hoa cổ điển, váy hồng bồng bềnh cho cô công chúa nhỏ.',
    description:
      'Concept sinh nhật giữa vườn hoa cổ điển, váy hồng bồng bềnh và bảng chúc mừng sinh nhật của bé.',
    photos: [
      ['Bé gái váy hồng ngồi ghế mây giữa vườn hoa', 'l'],
      ['Bé gái váy hồng đứng bên hộp trắng và bảng sinh nhật', 'l'],
      ['Bé gái đứng bên hộp quà giữa phông hoa', 'l'],
    ],
  }),
  concept({
    slug: 'sinh-nhat-quy-ong-nhi',
    name: 'Quý ông nhí',
    category: 'concept-ca-nhan',
    summary: 'Vest đen lịch lãm, bóng số 1 và xe cổ cho bé trai tròn tuổi.',
    description:
      'Concept sinh nhật cho bé trai với vest đen, bóng số và xe ô tô cổ trên phông tối sang trọng.',
    photos: [
      ['Bé trai mặc vest ngồi sofa nhỏ cạnh bóng số 1', 'p'],
      ['Bé trai mặc vest ngồi xe ô tô cổ đồ chơi', 'p'],
      ['Bé trai mặc vest bên bảng chúc mừng sinh nhật', 'p'],
      ['Bé trai ngồi sofa nhỏ, tay cầm bóng bay', 'p'],
    ],
  }),
  concept({
    slug: 'giang-sinh-me-va-be',
    name: 'Mẹ và bé mùa lễ hội',
    category: 'concept-ca-nhan',
    summary: 'Áo len đỏ, vòng nguyệt quế và tuyết bông cho hai mẹ con.',
    description:
      'Concept Giáng sinh cho mẹ và bé với áo đỏ đồng điệu, vòng trang trí và tuyết bông trắng.',
    photos: [
      ['Mẹ và bé gái mặc áo len đỏ ôm nhau giữa tuyết bông', 'p'],
      ['Mẹ và bé gái áo đỏ ngồi bên cây thông Noel', 'p'],
      ['Hai mẹ con mặc đồ đỏ cười đùa trong khung cảnh Giáng sinh', 'p'],
    ],
  }),
  concept({
    slug: 'giang-sinh-co-be-mu-do',
    name: 'Cô bé mũ đỏ',
    category: 'concept-ca-nhan',
    summary: 'Khăn len, mũ đỏ và gấu bông bên dòng chữ Merry Christmas.',
    description:
      'Concept Giáng sinh cho bé gái với mũ len đỏ, gấu bông và phông chữ Merry Christmas đáng yêu.',
    photos: [
      ['Bé gái đội mũ len đỏ ngồi giữa gấu bông và cây thông', 'l'],
      ['Bé gái mũ đỏ trước phông Merry Christmas', 'l'],
      ['Bé gái quàng khăn đỏ giữa đồ trang trí Giáng sinh', 'l'],
    ],
  }),
  concept({
    slug: 'nghe-thuat-tong-toi-am-ap',
    name: 'Tông tối ấm áp',
    category: 'nghe-thuat',
    summary: 'Phông đen trầm, ánh sáng mềm làm nổi bật cái ôm gia đình.',
    description:
      'Ảnh nghệ thuật trên phông tối với ánh sáng mềm, làm nổi bật cảm xúc và sự gắn bó của gia đình.',
    photos: [
      ['Bố mẹ ôm bé gái đội vòng hoa trên phông đen', 'p'],
      ['Mẹ, bố và bé gái quây quần trên phông tối', 'p'],
      ['Bố mẹ nâng bé lên cao trước phông đen', 'l'],
    ],
  }),
]

export function getConcept(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug)
}

export function getFeaturedConcepts(): Concept[] {
  return concepts.filter((c) => c.featured)
}

export function getConceptsByCategory(category: CategorySlug): Concept[] {
  return concepts.filter((c) => c.category === category)
}

export const conceptSlugs = concepts.map((c) => c.slug)
