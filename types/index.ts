// Kiểu dữ liệu dùng chung — đúng theo mục 9 của docs/REQUIREMENTS.md

export type BranchId = 'thu-duc' | 'go-vap'

export type CategorySlug =
  | 'bau'
  | 'beauty'
  | 'be'
  | 'gia-dinh'
  | 'concept-ca-nhan'
  | 'nghe-thuat'

/** Một ảnh tĩnh trong /public/images, kèm kích thước thật để next/image không bị nhảy layout. */
export interface Photo {
  src: string
  width: number
  height: number
  alt: string
  /** CSS object-position khi ảnh bị cắt khung (ví dụ ảnh ngang đặt vào khung dọc). */
  focus?: string
}

export interface Branch {
  id: BranchId
  name: string
  shortName: string
  address: string
  note: string
  mapUrl: string
  mapEmbedUrl?: string
  /** true = link bản đồ là link tìm kiếm theo địa chỉ, chưa có ghim chính thức */
  mapIsSearch?: boolean
  geo?: { lat: number; lng: number }
}

export interface Category {
  slug: CategorySlug
  name: string
  shortName: string
  description: string
  cover: Photo
  order: number
}

export interface Concept {
  slug: string
  name: string
  category: CategorySlug
  summary: string
  description: string
  cover: Photo
  gallery: Photo[]
  branches: BranchId[]
  packageIds: string[]
  featured?: boolean
  /** true = dữ liệu demo, chưa phải dữ liệu thật đã được khách xác nhận */
  placeholder?: boolean
}

export interface PricePackage {
  id: string
  name: string
  tagline: string
  category?: CategorySlug
  /** null = "Liên hệ báo giá" */
  price: number | null
  duration?: string
  editedPhotos?: number
  outfits?: number
  includes: string[]
  highlighted?: boolean
  placeholder?: boolean
}

export type BookingStatus = 'moi' | 'da-lien-he' | 'da-xac-nhan' | 'hoan-thanh' | 'da-huy'

export interface BookingRequest {
  id: string
  createdAt: string
  fullName: string
  phone: string
  branch: BranchId
  conceptSlugs: string[]
  packageId?: string
  preferredDate: string
  timeSlot?: 'sang' | 'chieu' | 'toi'
  people?: number
  note?: string
  facebook?: string
  status: BookingStatus
  internalNote?: string
}
