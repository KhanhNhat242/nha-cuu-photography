// Kiểm tra dữ liệu form đặt lịch (F08). Hàm thuần — trình duyệt dùng để báo lỗi sớm,
// Server Action gọi lại lần nữa trước khi lưu (không tin dữ liệu từ trình duyệt).
import { CONCEPT_CONSULT, MAX_PEOPLE, NAME_MAX, NAME_MIN, NOTE_MAX, timeSlots } from './constants'
import type { BookingErrors, BookingInput } from './types'

const PHONE_RE = /^(0|\+84)(3|5|7|8|9)\d{8}$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/** Bỏ khoảng trắng, dấu chấm, gạch ngang: "098 582 09 92" → "0985820992" */
export function normalizePhone(raw: string): string {
  return raw.replace(/[\s.-]/g, '')
}

export interface BookingRules {
  branchIds: readonly string[]
  conceptSlugs: readonly string[]
  packageIds: readonly string[]
  /** ngày sớm nhất (YYYY-MM-DD); '' = bỏ qua (trình duyệt chưa tính xong ngày) */
  minDate: string
}

export function validateBooking(input: BookingInput, rules: BookingRules): BookingErrors {
  const errors: BookingErrors = {}

  const name = input.fullName.trim()
  if (!name) errors.fullName = 'Bạn cho Nhà Cừu biết tên nhé.'
  else if (name.length < NAME_MIN || name.length > NAME_MAX) errors.fullName = `Họ tên dài từ ${NAME_MIN} đến ${NAME_MAX} ký tự.`

  const phone = normalizePhone(input.phone)
  if (!phone) errors.phone = 'Bạn nhập số điện thoại / Zalo nhé.'
  else if (!PHONE_RE.test(phone)) errors.phone = 'Số điện thoại chưa đúng, ví dụ 098 582 09 92.'

  if (!rules.branchIds.includes(input.branch)) errors.branch = 'Bạn chọn chi nhánh muốn chụp nhé.'

  if (input.concepts.length === 0) errors.concepts = 'Bạn chọn ít nhất 1 concept, hoặc nhờ Nhà Cừu tư vấn.'
  else if (input.concepts.some((c) => c !== CONCEPT_CONSULT && !rules.conceptSlugs.includes(c)))
    errors.concepts = 'Concept không có trong danh sách.'

  if (input.packageId && !rules.packageIds.includes(input.packageId)) errors.packageId = 'Gói chụp không có trong danh sách.'

  if (!input.preferredDate) errors.preferredDate = 'Bạn chọn ngày muốn chụp nhé.'
  else if (!DATE_RE.test(input.preferredDate)) errors.preferredDate = 'Ngày chưa đúng định dạng.'
  else if (rules.minDate && input.preferredDate < rules.minDate) errors.preferredDate = 'Bạn chọn từ ngày mai trở đi nhé.'

  if (input.timeSlot && !timeSlots.some((t) => t.value === input.timeSlot)) errors.timeSlot = 'Khung giờ không hợp lệ.'

  if (input.people) {
    const n = Number(input.people)
    if (!Number.isInteger(n) || n < 1 || n > MAX_PEOPLE) errors.people = `Số người từ 1 đến ${MAX_PEOPLE}.`
  }

  if (input.note.length > NOTE_MAX) errors.note = `Ghi chú tối đa ${NOTE_MAX} ký tự.`

  const fb = input.facebook.trim()
  if (fb) {
    try {
      const url = new URL(fb)
      if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error()
    } catch {
      errors.facebook = 'Link chưa đúng, ví dụ https://facebook.com/ten-cua-ban'
    }
  }

  return errors
}
