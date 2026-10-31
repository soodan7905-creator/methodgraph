import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CUTTRU | Creative Editorial Studio",
  description: "Trailers, film editing and editorial direction shaped by 25 years of professional experience. Explore CUTTRU’s free video project check or discuss your next project.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand"><span className="notranslate" translate="no" lang="en">CUTTRU</span></Link>
          <nav aria-label="Main navigation">
            <Link href="/#work">WORK</Link>
            <Link href="/#services">SERVICES</Link>
            <Link href="/diagnosis">FREE CHECK</Link>
            <Link href="/consult">CONTACT</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <strong><span className="notranslate" translate="no" lang="en">CUTTRU</span></strong>
          <div className="footer-meta">
            <span>TRAILERS · EDITING · DIRECTION</span>
            <Link className="footer-privacy" href="/privacy">Privacy</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
