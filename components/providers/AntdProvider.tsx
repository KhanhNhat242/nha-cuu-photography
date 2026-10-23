'use client'

// Cấu hình antd dùng chung: theme lấy cùng giá trị token với app/globals.css (R3.3), locale tiếng Việt (R4.6).
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import type { ReactNode } from 'react'

export const antdTheme = {
  token: {
    colorPrimary: '#3a3330', // --color-ink
    colorText: '#3a3330', // --color-ink
    colorTextSecondary: '#7a6f68', // --color-ink-muted
    colorBorder: '#efe8dc', // --color-line
    colorBgContainer: '#fffdf9', // --color-cream
    colorBgLayout: '#f7f1e8', // --color-cream-200
    colorLink: '#9c5b40', // --color-accent
    borderRadius: 12,
    fontFamily: 'var(--font-be-vietnam), ui-sans-serif, system-ui, sans-serif',
  },
}

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider locale={viVN} theme={antdTheme}>
      {children}
    </ConfigProvider>
  )
}
