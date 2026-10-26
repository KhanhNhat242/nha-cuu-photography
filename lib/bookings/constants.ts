// Hằng số dùng chung cho form đặt lịch (F08) — dùng được cả ở trình duyệt và server.
import type { BookingRequest } from '@/types'

export const NAME_MIN = 2
export const NAME_MAX = 80
export const MAX_PEOPLE = 20
export const NOTE_MAX = 1000

/** Giá trị đặc biệt trong ô Concept: khách chưa chọn được, nhờ studio tư vấn */
export const CONCEPT_CONSULT = 'nho-tu-van'

/** Sự kiện trình duyệt: nút "Chọn gói này" trên thẻ bảng giá → form điền sẵn gói (detail = id gói) */
export const SELECT_PACKAGE_EVENT = 'nha-cuu:select-package'

/** Tên ô bẫy spam (ẩn với người dùng, bot thường tự điền) */
export const HONEYPOT_FIELD = 'website'

/** id của khung form, để nút "Chọn gói này" cuộn tới */
export const BOOKING_FORM_ID = 'form-dat-lich'

/** [GIẢ ĐỊNH] chưa có giờ mở cửa thật (REQUIREMENTS F08) */
export const timeSlots: { value: NonNullable<BookingRequest['timeSlot']>; label: string }[] = [
  { value: 'sang', label: 'Sáng' },
  { value: 'chieu', label: 'Chiều' },
  { value: 'toi', label: 'Tối' },
]

/** Ngày hôm nay theo giờ Việt Nam, dạng YYYY-MM-DD */
export function todayInVietnam(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date())
}

/** "2026-10-26" + 1 → "2026-10-27" */
export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

/** Ngày sớm nhất được chọn: từ ngày mai trở đi (REQUIREMENTS F08) */
export function minBookingDate(): string {
  return addDays(todayInVietnam(), 1)
}
