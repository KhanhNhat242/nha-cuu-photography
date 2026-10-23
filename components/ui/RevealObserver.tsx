'use client'

// Bật hiệu ứng [data-reveal] (định nghĩa trong app/globals.css) khi phần tử đi vào màn hình.
// - Phần tử đi vào → đặt thuộc tính data-revealed
// - Phần tử rơi xuống dưới màn hình (cuộn ngược lên) → bỏ data-revealed để lần sau hiện lại
// - Theo dõi cả phần tử mới thêm vào DOM (chuyển trang client-side).
// Dùng thuộc tính data-* thay vì classList: classList.add/remove ghi lại thuộc tính class
// (chuẩn hóa khoảng trắng) → lệch hydration nếu chạy trước khi React hydrate xong phần tử đó.
import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.setAttribute('data-revealed', ''))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '')
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.removeAttribute('data-revealed')
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    )

    const observeWithin = (root: ParentNode) => {
      root.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    }
    observeWithin(document)

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches('[data-reveal]')) io.observe(node)
          observeWithin(node)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
