import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/themeContext';
import ThemedWrapper from '@/components/ThemedWrapper';

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
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider>
          <ThemedWrapper>{children}</ThemedWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
