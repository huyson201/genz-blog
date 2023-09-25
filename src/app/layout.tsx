import Navbar from '@/components/Navbar/Navbar'
import type { Metadata } from 'next'
import { Inter, Noto_Sans } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import Provider from '@/components/Provider/Provider'
import Footer from '@/components/Common/Footer/Footer'
import NavbarWrapper from '@/components/Navbar/NavbarWrapper/NavbarWrapper'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { createOpenGraphImg } from '@/utils'

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
  title: 'Discovering Code and Living Fully - Gen Z Blogger',
  description: 'Explore the world of programming, tech, and life through the eyes of a Gen Z blogger. Get coding tips, life lessons, and more.',
  applicationName: "Gen z Blogger",
  alternates: {
    canonical: process.env.WEB_HOST_NAME
  },
  openGraph: {
    title: 'Discovering Code and Living Fully - Gen Z Blogger',
    description: 'Explore the world of programming, tech, and life through the eyes of a Gen Z blogger. Get coding tips, life lessons, and more.',
    images: [`/api/screenshot?url=${createOpenGraphImg()}`],
    type: 'website',
    siteName: "Gen Z Blogger"

  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={twMerge(noto.variable, inter.variable, "bg-on_light_body_bg dark:bg-on_dark_body_bg transition-all")}>
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
        </Provider>
      </body>
    </html>
  )
}
