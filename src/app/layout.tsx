import type { Metadata } from 'next'
import { Inter, Noto_Sans } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import Provider from '@/components/Provider/Provider'
import Footer from '@/components/Common/Footer/Footer'
import NavbarWrapper from '@/components/Navbar/NavbarWrapper/NavbarWrapper'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { createOpenGraphImg } from '@/utils'
import SearchModal from '@/components/Search/SearchModal'

const inter = Inter({
  subsets: ['latin'],
  variable: "--inter-font"
})

const noto = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--noto-sans-font"
})


export const metadata: Metadata = {
  title: {
    default: "Discovering Code and Living Fully | Gen Z Blogger",
    template: "%s | Gen Z Blogger"
  },
  description: 'Explore the world of programming, tech, and life through the eyes of a Gen Z blogger. Get coding tips, life lessons, and more.',
  applicationName: "Gen z Blogger",
  verification: {
    google: "bQvN6nvIxBuTp2W5D8Chnp8h2zU-fDfgokwzwN08vl0",
    other: {
      me: ["sonnguyen201.dev@gmail.com"]
    }
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    nocache: true,
    follow: true
  },
  openGraph: {
    title: {
      default: "Discovering Code and Living Fully | Gen Z Blogger",
      template: "%s | Gen Z Blogger"
    },
    description: 'Explore the world of programming, tech, and life through the eyes of a Gen Z blogger. Get coding tips, life lessons, and more.',
    images: [`/api/screenshot?url=${createOpenGraphImg()}`],
    type: 'website',
    siteName: "Gen Z Blogger",
    url: "/"
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={twMerge(noto.variable, inter.variable, "bg-on_light_body_bg dark:bg-on_dark_body_bg")}>
        <Provider>
          <header>
            <NavbarWrapper />
          </header>
          {children}
          <Footer />
          <div>
            <Toaster
              position="top-center"
              reverseOrder={false} />
          </div>
          <SearchModal />
        </Provider>
      </body>
    </html>
  )
}
