import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CUTTRU | Video Project Decision Check",
  description: "From idea to final cut, CUTTRU helps you identify the decisions holding your video project back.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand notranslate" translate="no">CUTTRU</Link>
          <nav aria-label="Main navigation">
            <Link href="/diagnosis">Free Project Check</Link>
            <Link href="/consult">Professional Review</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <strong className="notranslate" translate="no">CUTTRU</strong>
          <span>Project judgment shaped by 25 years of professional editing experience.</span>
        </footer>
      </body>
    </html>
  );
}
