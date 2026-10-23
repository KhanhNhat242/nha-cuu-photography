// Định dạng hiển thị chuẩn (quy tắc R6.6)

/** 1500000 → "1.500.000đ" ; null → "Liên hệ báo giá" */
export function formatPrice(value: number | null): string {
  if (value === null) return 'Liên hệ báo giá'
  return new Intl.NumberFormat('vi-VN').format(value) + 'đ'
}

/** "0985820992" → "098 582 09 92" */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length !== 10) return raw
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`
}

/** "2026-10-24" → "24/10/2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-')
  return `${d}/${m}/${y}`
}

/** Link sang trang đặt lịch, điền sẵn concept/gói (REQUIREMENTS F07, F08) */
export function bookingUrl(params: { concepts?: string[]; packageId?: string } = {}): string {
  const search = new URLSearchParams()
  if (params.concepts?.length) search.set('concept', params.concepts.join(','))
  if (params.packageId) search.set('goi', params.packageId)
  const qs = search.toString()
  return qs ? `/dat-lich?${qs}` : '/dat-lich'
}
