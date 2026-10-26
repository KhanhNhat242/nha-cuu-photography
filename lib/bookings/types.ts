// Kiểu dữ liệu của form đặt lịch (F08). Bản ghi lưu trữ là BookingRequest trong types/index.ts.

/** Giá trị thô của form — chuỗi như người dùng nhập, chưa chuẩn hóa */
export interface BookingInput {
  fullName: string
  phone: string
  branch: string
  concepts: string[]
  packageId: string
  preferredDate: string
  timeSlot: string
  people: string
  note: string
  facebook: string
}

export type BookingErrors = Partial<Record<keyof BookingInput, string>>

export interface BookingFormState {
  ok: boolean
  errors: BookingErrors
  message?: string
  /** mã yêu cầu khi gửi thành công */
  id?: string
  fullName?: string
  phone?: string
}
