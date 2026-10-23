import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Suspense } from 'react'
import { siteConfig } from '@/lib/site-config'
import { conceptSlugs } from '@/data/concepts'
import { ogImage } from '@/data/home'
import { AntdProvider } from '@/components/providers/AntdProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { SelectedConceptsTray } from '@/components/concept/SelectedConceptsTray'
import { RevealObserver } from '@/components/ui/RevealObserver'

// Font hỗ trợ tiếng Việt (R4.8, REQUIREMENTS 6.3)
const display = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const sans = Be_Vietnam_Pro({
  variable: '--font-be-vietnam',
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Studio chụp ảnh Bầu, Bé, Gia đình tại TP.HCM`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Studio chụp ảnh Bầu, Bé, Gia đình tại TP.HCM`,
    description: siteConfig.description,
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt }],
  },
}

export const viewport: Viewport = {
  themeColor: '#fffdf9',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Suspense fallback={null}>
          <AntdRegistry>
            <AntdProvider>
              <a
                href="#noi-dung"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
              >
                Bỏ qua tới nội dung chính
              </a>
              <Header validSlugs={conceptSlugs} />
              <main id="noi-dung" className="flex-1">
                {children}
              </main>
              <Footer />
              <FloatingContact />
              <SelectedConceptsTray validSlugs={conceptSlugs} />
              <RevealObserver />
            </AntdProvider>
          </AntdRegistry>
        </Suspense>
      </body>
    </html>
  )
}
