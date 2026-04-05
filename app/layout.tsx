import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dx Media | وكالة تسويق رقمي متميزة',
  description: 'Dx Media - وكالة تسويق رقمي احترافية متخصصة في تصميم الجرافكس، تحرير الفيديوهات، التسويق الرقمي، وتصميم المواقع.',
  keywords: 'تسويق رقمي, تصميم جرافكس, تحرير فيديو, وكالة تسويق, Dx Media',
  openGraph: {
    title: 'Dx Media | وكالة تسويق رقمي متميزة',
    description: 'نبني علامات تجارية تتصدر المشهد',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&family=Changa:wght@400;500;600;700;800&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Changa', sans-serif", backgroundColor: '#0a0a0a', color: '#f0f0f0' }}>
        {children}
      </body>
    </html>
  );
}
