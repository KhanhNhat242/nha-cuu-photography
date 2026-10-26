'use client'

// Nút "Chọn gói này" trên thẻ bảng giá: điền sẵn gói vào form đặt lịch cùng section và cuộn tới form
// (landing page một trang — không chuyển trang).
import type { ReactNode } from 'react'
import { BOOKING_FORM_ID, SELECT_PACKAGE_EVENT } from '@/lib/bookings/constants'

export function SelectPackageButton({ packageId, className, children }: { packageId: string; className?: string; children: ReactNode }) {
  const onClick = () => {
    window.dispatchEvent(new CustomEvent(SELECT_PACKAGE_EVENT, { detail: packageId }))
    const form = document.getElementById(BOOKING_FORM_ID)
    if (!form) return
    const { top } = form.getBoundingClientRect()
    // form nằm ngoài tầm nhìn (mobile: form ở dưới các thẻ) → cuộn tới
    if (top < 0 || top > window.innerHeight * 0.5) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    }
    document.getElementById('booking-packageId')?.focus({ preventScroll: true })
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  )
}
