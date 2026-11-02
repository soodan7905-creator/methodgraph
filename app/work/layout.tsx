import Link from "next/link";
import "../studio.css";
export default function WorkLayout({children}: {children: React.ReactNode}) {
  return <div className="studio-page studio-portfolio-page"><nav className="studio-shell studio-portfolio-nav" aria-label="Portfolio"><a href="/#work">← ALL WORK</a><Link href="/work/trailers">TRAILERS</Link><Link href="/work/films">FILMS &amp; VIDEO</Link><Link href="/work/branding">OAP &amp; BRANDING</Link></nav>{children}</div>;
}
