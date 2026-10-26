'use server'

// Server Action gửi yêu cầu đặt lịch (F08). Luôn kiểm tra lại dữ liệu ở server (R4.4).
import { branches } from '@/lib/site-config'
import { conceptSlugs } from '@/data/concepts'
import { packages } from '@/data/packages'
import { formatPhone } from '@/lib/format'
import type { BookingRequest } from '@/types'
import { HONEYPOT_FIELD, minBookingDate } from './constants'
import { bookingRepository } from './repository'
import type { BookingFormState, BookingInput } from './types'
import { normalizePhone, validateBooking } from './validate'

const text = (fd: FormData, key: string) => {
  const v = fd.get(key)
  return typeof v === 'string' ? v : ''
}

export async function createBooking(_prev: BookingFormState, formData: FormData): Promise<BookingFormState> {
  const input: BookingInput = {
    fullName: text(formData, 'fullName'),
    phone: text(formData, 'phone'),
    branch: text(formData, 'branch'),
    concepts: [...new Set(formData.getAll('concepts').filter((v): v is string => typeof v === 'string'))],
    packageId: text(formData, 'packageId'),
    preferredDate: text(formData, 'preferredDate'),
    timeSlot: text(formData, 'timeSlot'),
    people: text(formData, 'people'),
    note: text(formData, 'note'),
    facebook: text(formData, 'facebook'),
  }

  // Bot điền ô bẫy → trả về như thành công nhưng không lưu
  if (text(formData, HONEYPOT_FIELD)) return { ok: true, errors: {}, id: '—', fullName: input.fullName.trim() }

  const errors = validateBooking(input, {
    branchIds: branches.map((b) => b.id),
    conceptSlugs,
    packageIds: packages.map((p) => p.id),
    minDate: minBookingDate(),
  })
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, message: 'Bạn kiểm tra lại các ô được đánh dấu giúp Nhà Cừu nhé.' }
  }

  try {
    const record = await bookingRepository.create({
      fullName: input.fullName.trim(),
      phone: normalizePhone(input.phone),
      branch: input.branch as BookingRequest['branch'],
      conceptSlugs: input.concepts,
      packageId: input.packageId || undefined,
      preferredDate: input.preferredDate,
      timeSlot: (input.timeSlot || undefined) as BookingRequest['timeSlot'],
      people: input.people ? Number(input.people) : undefined,
      note: input.note.trim() || undefined,
      facebook: input.facebook.trim() || undefined,
    })
    return { ok: true, errors: {}, id: record.id, fullName: record.fullName, phone: formatPhone(record.phone) }
  } catch (err) {
    console.error('[bookings] Lưu yêu cầu thất bại:', err)
    return { ok: false, errors: {}, message: 'Chưa gửi được yêu cầu. Bạn thử lại sau ít phút hoặc nhắn Zalo cho Nhà Cừu nhé.' }
  }
}
