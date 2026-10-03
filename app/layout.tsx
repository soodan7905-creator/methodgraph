import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "MethodGraph | 영상 프로젝트 판단 점검",
  description: "아이디어부터 완성본까지, 영상 프로젝트의 판단 구조를 점검합니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">METHODGRAPH</Link>
          <nav aria-label="주요 메뉴">
            <Link href="/diagnosis">무료 진단</Link>
            <Link href="/consult">전문 피드백</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <strong>METHODGRAPH</strong>
          <span>25년 편집 경험으로 프로젝트의 판단 지점을 봅니다.</span>
        </footer>
      </body>
    </html>
  );
}
