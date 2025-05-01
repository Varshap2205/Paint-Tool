// src/app/layout.js
import '../styles/globals.css'

export const metadata = {
  title: 'Paint Clone',
  description: 'A simple paint app built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
