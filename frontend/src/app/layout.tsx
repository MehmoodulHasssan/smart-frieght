import type { Metadata } from 'next';
import './globals.css';
// import ThemedWrapper from '@/components/ThemedWrapper';
import ContextWrapper from '@/components/ContextWrapper';

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

export const metadata: Metadata = {
  title: 'Smart Fright',
  description: 'AI-Powered Truck Space Optimization Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hide-scrollbar">
      <body className={`antialiased`}>
        <ContextWrapper>{children}</ContextWrapper>
      </body>
    </html>
  );
}
