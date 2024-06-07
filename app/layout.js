import './globals.css';

export const metadata = {
  title: 'Cryptocurrency Price Alerts',
  description: 'A simple price alert system for BTCUSDT',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container mx-auto p-4">{children}</body>
    </html>
  )
}

