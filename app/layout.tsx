import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Serif_SC, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});
const notoSerif = Noto_Serif_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif'
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arieswarrior.vercel.app'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: '白羊武士弗拉明戈的修道场',
    template: '%s | 白羊武士弗拉明戈的修道场'
  },
  description:
    '超级个体，大辰教育合作 AI 讲师。深度 Claude code，Codex，Gemini 和 n8n 用户，出海产品持续构建。'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${notoSerif.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased font-sans tracking-tight bg-[#fcfcfc] text-[#1a1a1a] selection:bg-amber-50">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
