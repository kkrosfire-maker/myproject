import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 바이브 코딩 마스터클래스",
  description: "코딩 없이 AI로 업무 도구를 만드는 법 — 사내 강의 신청",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${GeistMono.variable} bg-neutral-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
