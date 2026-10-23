// Hoạ tiết "đám mây lông cừu" nét liền mạch — vẽ lại từ logo Nhà Cừu (REQUIREMENTS 6.5).
// Chỉ dùng để trang trí: luôn aria-hidden, độ mờ thấp.

const WOOL_PATH =
  'M9.4 150 C25.4 152 37.4 140 43.4 128 A26.1 26.1 0 0 1 32.2 82.7 a6.5 6.5 0 1 0 0.9 -2.8 A29.2 29.2 0 0 1 71.2 44.2 a6.5 6.5 0 1 0 2.7 -1.3 A33.9 33.9 0 0 1 133.5 32 a6.5 6.5 0 1 0 3 0.1 A33.4 33.4 0 0 1 194.3 47 a6.5 6.5 0 1 0 2.6 1.4 A28.2 28.2 0 0 1 229 87.1 a6.5 6.5 0 1 0 0.6 2.9 A25.2 25.2 0 0 1 212.9 131.8 C216.9 157.8 242.9 165.8 282.9 161.8'

export function WoolLine({
  className,
  strokeWidth = 1.4,
}: {
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 292 172"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d={WOOL_PATH}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** Đường cong lông cừu mảnh dùng làm gạch chân/ngăn cách nhỏ dưới tiêu đề */
export function WoolSquiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" fill="none" aria-hidden="true" focusable="false" className={className}>
      <path
        d="M2 10c10 0 14-6 22-6s8 9 3 9-3-9 7-9 12 6 20 6 12-6 20-6 8 9 3 9-3-9 7-9 12 6 20 6 10-2 14-2"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
