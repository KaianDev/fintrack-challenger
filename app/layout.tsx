import type { Metadata } from "next"
import { Nunito as FontSans } from "next/font/google"
import "./globals.css"

// Utilities
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "FinTrack",
  description:
    "Bem-vindo ao Fintrack! Simplifique sua gestão financeira e tome decisões inteligentes. Adicione suas transações e visualize sua situação financeira com gráficos intuitivos.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning className="dark">
      <head>
        <link
          rel="icon"
          href="/fintrack-logo.svg"
          type="image/svg"
          sizes="any"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
