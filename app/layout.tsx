import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"

const fontSans = Nunito({ subsets: ["latin"], weight: ["400", "600", "700"] })

export const metadata: Metadata = {
  title: "FinTrack",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>{children}</body>
    </html>
  )
}
