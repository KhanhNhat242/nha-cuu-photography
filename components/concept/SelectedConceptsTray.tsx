'use client'

// Khay "Concept đã chọn" (F07): thanh nâu ấm trượt lên ở cạnh dưới màn hình khi đã chọn ≥ 1 concept.
// Mobile: chừa chỗ bên phải cho cụm nút Zalo/Messenger nổi (F10) — không che nhau.
import Link from 'next/link'
import { clearConcepts, useSelectedConcepts } from '@/lib/concept-selection'
import { bookingUrl } from '@/lib/format'
import { ArrowRightIcon, CloseIcon } from '@/components/ui/Icons'

export function SelectedConceptsTray({ validSlugs }: { validSlugs: string[] }) {
  const selected = useSelectedConcepts().filter((s) => validSlugs.includes(s))
  const count = selected.length
  const visible = count > 0

  return (
    <div
      className={`fixed bottom-4 left-4 right-[5.25rem] z-40 transition-[transform,opacity] duration-500 ease-soft md:bottom-6 md:left-1/2 md:right-auto md:w-max md:-translate-x-1/2 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[140%] opacity-0'
      }`}
      inert={!visible}
    >
      <div className="flex items-center gap-2 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-cream shadow-float">
        <p className="min-w-0 flex-1 truncate text-sm md:flex-none" aria-live="polite">
          Đã chọn <strong className="font-semibold">{count}</strong>
          <span className="hidden min-[400px]:inline"> concept</span>
        </p>
        <button
          type="button"
          onClick={clearConcepts}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream sm:inline-flex"
          aria-label="Bỏ chọn tất cả concept"
        >
          <CloseIcon size={16} />
        </button>
        <Link
          href={bookingUrl({ concepts: selected })}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-cream px-4 text-[13px] font-semibold text-ink transition-colors hover:bg-cream-200"
        >
          Đặt lịch ngay
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    </div>
  )
}
