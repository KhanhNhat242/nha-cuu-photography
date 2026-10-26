// Bộ icon nét mảnh (stroke 1.5) dùng chung — không phụ thuộc thư viện ngoài.
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
)

export const ArrowUpRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
)

export const PlusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
)

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
)

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
)

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8h16M4 16h11" />
  </Base>
)

export const ChevronLeftIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m15 5-7 7 7 7" />
  </Base>
)

export const ChevronRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 5 7 7-7 7" />
  </Base>
)

export const MapPinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </Base>
)

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  </Base>
)

export const CalendarIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="3" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Base>
)

export const BranchesIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 20h18M5 20V10l5-4 5 4v10" />
    <path d="M15 20v-6l3-2.4 3 2.4v6M8.5 20v-4h3v4" />
  </Base>
)

export const CameraIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.8l1.4-2h4.6l1.4 2h1.8A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5Z" />
    <circle cx="12" cy="12.5" r="3.5" />
  </Base>
)

export const SparkleIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5Z" />
    <path d="M18.5 15.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5Z" />
  </Base>
)

export const ChatIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 11.5c0 4-3.6 7-8 7a9 9 0 0 1-3.2-.6L4 19.5l1.4-3.6A6.6 6.6 0 0 1 4 11.5c0-4 3.6-7 8-7s8 3 8 7Z" />
    <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth={2.2} />
  </Base>
)

export const ImagesIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5.5" width="14" height="14" rx="2.5" />
    <path d="M7 3.5h11a2.5 2.5 0 0 1 2.5 2.5v11" />
    <path d="m3.5 16 4-4 4.5 4.5M13.5 14l1.5-1.5 2.5 2.5" />
  </Base>
)

export const PauseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 6v12M15 6v12" />
  </Base>
)

export const PlayIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5v13l10.5-6.5Z" />
  </Base>
)

/** Logo Facebook (dạng chữ f) */
export const FacebookIcon = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3Z" />
  </svg>
)

/** Biểu tượng Messenger */
export const MessengerIcon = ({ size = 22, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 2.5C6.6 2.5 2.5 6.4 2.5 11.6c0 2.7 1.1 5.1 3 6.7v3.2l2.9-1.6c1.1.3 2.3.5 3.6.5 5.4 0 9.5-3.9 9.5-9.1S17.4 2.5 12 2.5Zm1 12.2-2.4-2.6-4.7 2.6 5.2-5.5 2.5 2.6 4.6-2.6-5.2 5.5Z" />
  </svg>
)

/** Biểu tượng Zalo (chữ "Zalo" trong bong bóng) */
export const ZaloIcon = ({
  size = 24,
  textFill = 'var(--color-cream)',
  ...p
}: IconProps & { textFill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...p}>
    <path
      fill="currentColor"
      d="M24 5C12.4 5 3 12.9 3 22.6c0 5.6 3.1 10.6 8 13.8L9.6 43l7.6-4.1c2.1.6 4.4.9 6.8.9 11.6 0 21-7.9 21-17.6S35.6 5 24 5Z"
    />
    <text
      x="24"
      y="27.6"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontWeight="700"
      fontSize="12.5"
      fill={textFill}
    >
      Zalo
    </text>
  </svg>
)
