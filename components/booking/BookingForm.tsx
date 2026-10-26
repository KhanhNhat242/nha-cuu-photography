'use client'

// F08 — Form gửi yêu cầu đặt lịch (đặt trong khối Bảng giá trang chủ).
// Gửi bằng Server Action createBooking; kiểm tra ở trình duyệt để báo lỗi sớm, server kiểm tra lại.
// Concept đã chọn trong khay (F07) được điền sẵn; nút "Chọn gói này" trên thẻ giá điền sẵn gói.
import Image from 'next/image'
import { useActionState, useEffect, useState, useSyncExternalStore, type ChangeEvent, type FormEvent, type ReactNode, type SelectHTMLAttributes } from 'react'
import { ConfigProvider, DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { createBooking } from '@/lib/bookings/actions'
import {
  BOOKING_FORM_ID,
  CONCEPT_CONSULT,
  HONEYPOT_FIELD,
  MAX_PEOPLE,
  NOTE_MAX,
  SELECT_PACKAGE_EVENT,
  minBookingDate,
  timeSlots,
} from '@/lib/bookings/constants'
import type { BookingErrors, BookingFormState, BookingInput } from '@/lib/bookings/types'
import { validateBooking } from '@/lib/bookings/validate'
import { useSelectedConcepts } from '@/lib/concept-selection'
import { siteConfig } from '@/lib/site-config'
import { ChevronRightIcon, ZaloIcon } from '@/components/ui/Icons'

interface Option {
  value: string
  label: string
}

export interface BookingFormProps {
  branches: Option[]
  conceptGroups: { label: string; options: Option[] }[]
  packages: Option[]
  defaultPackageId: string
}

dayjs.locale('vi')

/** antd trong form: chữ cùng cỡ với các ô nhập thường (14px) */
const formTheme = { token: { fontSizeLG: 14 } }

const initialState: BookingFormState = { ok: false, errors: {} }

const fieldClass =
  'w-full rounded-xl border bg-cream px-3.5 py-2.5 text-sm text-ink transition-colors duration-300 placeholder:text-ink-muted/60 focus:border-accent focus:outline-none'

// Ngày tối thiểu chỉ tính ở trình duyệt (server trả '' để không dùng new Date() khi prerender)
const subscribeNoop = () => () => { }
const useMinDate = () => useSyncExternalStore(subscribeNoop, minBookingDate, () => '')

function Field({ name, label, error, children }: { name: keyof BookingInput; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={`booking-${name}`} className="mb-1.5 block text-xs tracking-wide text-ink-soft">
        {label}
      </label>
      {children}
      {error && (
        <p id={`booking-${name}-error`} className="mt-1 text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  )
}

/** select gốc của trình duyệt, thêm mũi tên nét mảnh */
function NativeSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={`${props.className} appearance-none pr-9`} />
      <ChevronRightIcon size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-ink-muted" />
    </div>
  )
}

export function BookingForm({ branches, conceptGroups, packages, defaultPackageId }: BookingFormProps) {
  const emptyInput: BookingInput = {
    fullName: '',
    phone: '',
    branch: '',
    concepts: [],
    packageId: defaultPackageId,
    preferredDate: '',
    timeSlot: '',
    people: '1',
    note: '',
    facebook: '',
  }

  const [state, formAction, pending] = useActionState(createBooking, initialState)
  const [values, setValues] = useState<BookingInput>(emptyInput)
  const [conceptsTouched, setConceptsTouched] = useState(false)
  const [clientErrors, setClientErrors] = useState<BookingErrors>({})
  const [showSuccess, setShowSuccess] = useState(true)
  const minDate = useMinDate()

  // Concept trong khay (F07) điền sẵn cho tới khi khách tự sửa ô Concept
  const validSlugs = conceptGroups.flatMap((g) => g.options.map((o) => o.value))
  const selected = useSelectedConcepts().filter((s) => validSlugs.includes(s))
  const concepts = conceptsTouched ? values.concepts : selected

  // Nhận gói được chọn từ nút "Chọn gói này" trên thẻ bảng giá
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      setValues((v) => ({ ...v, packageId: id }))
      setClientErrors((errs) => ({ ...errs, packageId: undefined }))
    }
    window.addEventListener(SELECT_PACKAGE_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_PACKAGE_EVENT, onSelect)
  }, [])

  const errors: BookingErrors = { ...state.errors, ...clientErrors }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof BookingInput
    setValues((v) => ({ ...v, [name]: e.target.value }))
    setClientErrors((errs) => ({ ...errs, [name]: undefined }))
  }

  const onConceptsChange = (next: string[]) => {
    // "Nhờ tư vấn" và concept cụ thể không đi cùng nhau: chọn cái nào sau thì giữ cái đó
    const last = next.at(-1)
    const cleaned = last === CONCEPT_CONSULT ? [CONCEPT_CONSULT] : next.filter((c) => c !== CONCEPT_CONSULT)
    setConceptsTouched(true)
    setValues((v) => ({ ...v, concepts: cleaned }))
    setClientErrors((errs) => ({ ...errs, concepts: undefined }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const found = validateBooking(
      { ...values, concepts },
      {
        branchIds: branches.map((b) => b.value),
        conceptSlugs: validSlugs,
        packageIds: packages.map((p) => p.value),
        minDate,
      },
    )
    setClientErrors(found)
    if (Object.keys(found).length > 0) {
      e.preventDefault()
      const first = Object.keys(found)[0]
      document.getElementById(`booking-${first}`)?.focus()
      return
    }
    setShowSuccess(true)
  }

  const resetForm = () => {
    setValues(emptyInput)
    setConceptsTouched(false)
    setClientErrors({})
    setShowSuccess(false)
  }

  const fieldProps = (name: Exclude<keyof BookingInput, 'concepts'>) => ({
    id: `booking-${name}`,
    name,
    value: values[name],
    onChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `booking-${name}-error` : undefined,
    className: `${fieldClass} ${errors[name] ? 'border-accent/70' : 'border-line'}`,
  })

  return (
    <div
      id={BOOKING_FORM_ID}
      className="@container scroll-mt-[calc(var(--header-h)+1.5rem)] rounded-[28px] border border-line bg-cream-200 p-6 shadow-soft sm:p-8"
    >
      {/* Thẻ studio nhỏ */}
      <div className="mb-6 flex items-center gap-3.5 rounded-2xl border border-line bg-cream p-3">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent-soft">
          <Image src="/images/logo/sheep-head.png" alt="" width={40} height={40} className="h-9 w-auto" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-lg font-medium leading-tight text-ink">Gửi yêu cầu đặt lịch</p>
          <p className="mt-0.5 text-xs text-ink-muted">{branches.map((b) => b.label).join(' · ')}</p>
        </div>
      </div>

      {state.ok && showSuccess ? (
        <div className="py-6 text-center" role="status">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <h3 className="mt-4 font-display text-2xl font-medium text-ink">Nhà Cừu đã nhận yêu cầu của bạn!</h3>
          {state.id && state.id !== '—' && (
            <p className="mt-3 text-sm text-ink-soft">
              Mã yêu cầu: <span className="font-semibold tracking-wide text-ink">{state.id}</span>
            </p>
          )}
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            Cảm ơn {state.fullName}. Đây là yêu cầu đặt lịch, Nhà Cừu sẽ liên hệ
            {state.phone ? ` qua số ${state.phone}` : ''} (điện thoại / Zalo) để xác nhận lịch chụp sớm nhất nhé.
          </p>
          <a
            href={siteConfig.social.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-cream shadow-float transition-colors duration-300 hover:bg-ink-soft"
          >
            <ZaloIcon size={20} />
            Nhắn Zalo cho Nhà Cừu ngay
          </a>
          <button type="button" onClick={resetForm} className="mt-4 block w-full text-xs text-accent hover:underline">
            Gửi một yêu cầu khác
          </button>
        </div>
      ) : (
        <ConfigProvider theme={formTheme}>
          <form action={formAction} onSubmit={onSubmit} noValidate className="space-y-4">
            {/* Ô bẫy spam: ẩn với người dùng và trình đọc màn hình */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="booking-website">Website</label>
              <input id="booking-website" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-4 @lg:grid-cols-2">
              <Field name="fullName" label="Họ và tên *" error={errors.fullName}>
                <input {...fieldProps('fullName')} type="text" autoComplete="name" placeholder="Nguyễn Thị Mai" />
              </Field>
              <Field name="phone" label="SĐT / Zalo *" error={errors.phone}>
                <input {...fieldProps('phone')} type="tel" autoComplete="tel" inputMode="tel" placeholder="09xx xxx xxx" />
              </Field>
            </div>

            <div className="grid gap-4 @lg:grid-cols-2">
              <Field name="branch" label="Chi nhánh *" error={errors.branch}>
                <NativeSelect {...fieldProps('branch')}>
                  <option value="" disabled>
                    Chọn chi nhánh
                  </option>
                  {branches.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field name="packageId" label="Gói chụp" error={errors.packageId}>
                <NativeSelect {...fieldProps('packageId')}>
                  <option value="">Chưa chọn, nhờ tư vấn</option>
                  {packages.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
            </div>

            <Field name="concepts" label="Concept *" error={errors.concepts}>
              <Select
                id="booking-concepts"
                mode="multiple"
                size="large"
                value={concepts}
                onChange={onConceptsChange}
                options={[...conceptGroups, { label: 'Khác', options: [{ value: CONCEPT_CONSULT, label: 'Nhờ Nhà Cừu tư vấn giúp' }] }]}
                placeholder="Chọn một hoặc nhiều concept"
                optionFilterProp="label"
                maxTagCount="responsive"
                status={errors.concepts ? 'error' : undefined}
                aria-invalid={errors.concepts ? true : undefined}
                aria-describedby={errors.concepts ? 'booking-concepts-error' : undefined}
                className="w-full"
              />
              {concepts.map((c) => (
                <input key={c} type="hidden" name="concepts" value={c} />
              ))}
            </Field>

            <div className="grid gap-4 @lg:grid-cols-2">
              <Field name="preferredDate" label="Ngày chụp mong muốn *" error={errors.preferredDate}>
                <DatePicker
                  id="booking-preferredDate"
                  size="large"
                  format="DD/MM/YYYY"
                  placeholder="dd/mm/yyyy"
                  value={values.preferredDate ? dayjs(values.preferredDate) : null}
                  onChange={(d) => {
                    setValues((v) => ({ ...v, preferredDate: d ? d.format('YYYY-MM-DD') : '' }))
                    setClientErrors((errs) => ({ ...errs, preferredDate: undefined }))
                  }}
                  disabledDate={(d) => !!minDate && d.format('YYYY-MM-DD') < minDate}
                  inputReadOnly
                  status={errors.preferredDate ? 'error' : undefined}
                  className="w-full"
                />
                <input type="hidden" name="preferredDate" value={values.preferredDate} />
              </Field>
              <Field name="timeSlot" label="Khung giờ" error={errors.timeSlot}>
                <NativeSelect {...fieldProps('timeSlot')}>
                  <option value="">Linh hoạt</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
            </div>

            <Field name="note" label="Ghi chú / mong muốn riêng" error={errors.note}>
              <textarea
                {...fieldProps('note')}
                rows={3}
                maxLength={NOTE_MAX}
                placeholder="Ví dụ: mình thích phong cách nhẹ nhàng, chụp buổi sáng…"
              />
            </Field>

            {state.message && !state.ok && (
              <p className="rounded-xl bg-accent-soft px-4 py-2.5 text-center text-xs text-accent" role="alert">
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="h-12 w-full rounded-full bg-ink text-sm font-medium tracking-wide text-cream shadow-float transition-[background-color,transform] duration-300 hover:bg-ink-soft active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
            >
              {pending ? 'Đang gửi…' : 'Gửi yêu cầu đặt lịch'}
            </button>

            <p className="text-center text-xs text-ink-muted">
              Hoặc nhắn nhanh qua Zalo:{' '}
              <a href={siteConfig.social.zalo} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                {siteConfig.phone.display}
              </a>
            </p>
          </form>
        </ConfigProvider>
      )}
    </div>
  )
}
