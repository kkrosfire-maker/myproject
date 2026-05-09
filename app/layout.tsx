import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김종석의 AI 바이브 코딩 마스터 클래스",
  description: "코딩 없이 AI로 업무 도구를 만드는 법 — 사내 강의 신청",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-neutral-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
