'use client'

// Nút "Chọn concept" (F07): bấm để thêm/bỏ concept khỏi khay đặt lịch.
import { toggleConcept, useSelectedConcepts } from '@/lib/concept-selection'
import { CheckIcon, PlusIcon } from '@/components/ui/Icons'

export function SelectConceptButton({
  slug,
  name,
  className = '',
}: {
  slug: string
  name: string
  className?: string
}) {
  const selected = useSelectedConcepts().includes(slug)

  return (
    <button
      type="button"
      onClick={() => toggleConcept(slug)}
      aria-pressed={selected}
      aria-label={selected ? `Bỏ chọn concept ${name}` : `Chọn concept ${name}`}
      className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors duration-300 ${
        selected
          ? 'bg-ink text-cream hover:bg-ink-soft'
          : 'border border-ink/20 bg-cream text-ink hover:border-ink'
      } ${className}`}
    >
      {selected ? <CheckIcon size={16} /> : <PlusIcon size={16} />}
      {selected ? 'Đã chọn' : 'Chọn concept'}
    </button>
  )
}
