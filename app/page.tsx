import Link from "next/link";
import "./studio.css";

const services = [
  { number: "01", title: "TRAILERS", description: "Teasers · Trailers · Promos", className: "studio-service-trailers" },
  { number: "02", title: "EDITING", description: "Brand Films · Video Content", className: "studio-service-editing" },
  { number: "03", title: "DIRECTION", description: "Story · Emotion · Rhythm", className: "studio-service-direction" },
];

export default function Home() {
  return (
    <div className="studio-page" id="top">
      <section className="studio-hero">
        <div className="studio-hero-photo" role="img" aria-label="Conceptual low-key cinematic portrait, not a client project" />
        <div className="studio-shell studio-hero-content">
          <p className="studio-overline">CREATIVE EDITORIAL STUDIO</p>
          <h1>The story lives<br />in the <em>cut.</em></h1>
          <p className="studio-hero-subtitle">CUTTRU</p>
          <p className="studio-hero-description">
            Trailers, editorial direction, and storytelling.<br />
            Shaped by 25 years in professional film editing.
          </p>
          <div className="studio-actions">
            <a className="studio-button studio-button-mint" href="#work">VIEW WORK <span aria-hidden="true">↗</span></a>
            <Link className="studio-text-link" href="/consult">START A PROJECT <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="studio-hero-aside" aria-hidden="true">STORY<br />EDITING<br />EMOTION<br />IMPACT</div>
        <div className="studio-hero-counter" aria-hidden="true">01 / 05</div>
      </section>

      <section className="studio-services" id="services" aria-label="Services">
        {services.map((service) => (
          <article className={`studio-service ${service.className}`} key={service.number}>
            <span className="studio-service-index">{service.number}</span>
            <div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="studio-work studio-shell" id="work">
        <div className="studio-section-heading">
          <p>SELECTED EXPERIENCE</p>
          <span>FILM &amp; EDITORIAL WORK</span>
        </div>
        <div className="studio-work-grid">
          <article className="studio-work-card studio-work-first">
            <div className="studio-work-visual">
              <span className="studio-work-kind">FEATURE FILM</span>
              <span className="studio-work-number">01</span>
              <strong>THE<br />ADMIRAL</strong>
              <small>MYEONGRYANG</small>
            </div>
            <div className="studio-work-caption"><h3>The Admiral</h3><p>Selected film experience</p></div>
          </article>
          <article className="studio-work-card studio-work-second">
            <div className="studio-work-visual">
              <span className="studio-work-kind">FEATURE FILM</span>
              <span className="studio-work-number">02</span>
              <strong>THE<br />PIRATES</strong>
              <small>HAEJEOK</small>
            </div>
            <div className="studio-work-caption"><h3>The Pirates</h3><p>Selected film experience</p></div>
          </article>
          <article className="studio-work-card studio-work-third">
            <div className="studio-work-visual">
              <span className="studio-work-kind">EDITORIAL</span>
              <span className="studio-work-number">03</span>
              <strong>YOUR<br />STORY.</strong>
              <small>THE NEXT PROJECT</small>
            </div>
            <div className="studio-work-caption"><h3>Your next project</h3><p>Trailers · Story-led editing</p></div>
          </article>
        </div>
        <div className="studio-actions">
          <a
            className="studio-button studio-button-outline"
            href="https://www.o-vation.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            WATCH THE ORIGINAL FILM TRAILER PORTFOLIO <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p className="studio-disclaimer">
          The visuals above are conceptual graphic treatments, not video stills. View the completed trailer work
          on O-VATION, the original film trailer portfolio.
        </p>
      </section>

      <section className="studio-about" id="about">
        <div className="studio-about-art" aria-hidden="true"><span>FRAME / 001</span><span>STORY IS A SERIES OF DECISIONS.</span></div>
        <div className="studio-about-copy">
          <p className="studio-overline">ABOUT CUTTRU</p>
          <h2>Editing is not just<br />what you remove.<br /><em>It&apos;s what you choose<br />to keep.</em></h2>
          <p>We find the story, shape its emotional rhythm, and make every cut count.</p>
          <Link href="/consult" className="studio-text-link">DISCUSS A PROJECT <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="studio-book studio-shell" aria-label="For readers of Why Cut Here">
        <div>
          <p className="studio-overline">FROM THE BOOK · WHY CUT HERE</p>
          <h2>Have a project in mind?</h2>
          <p>Explore the free 10-question check, or request an editorial review of your actual work.</p>
        </div>
        <Link className="studio-button studio-button-outline" href="/diagnosis">FREE PROJECT CHECK <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="studio-contact" id="contact">
        <div className="studio-shell studio-contact-inner">
          <p className="studio-overline">LET&apos;S MAKE A STRONGER STORY</p>
          <h2>Let&apos;s talk about<br />your <em>project.</em></h2>
          <Link className="studio-button studio-button-outline" href="/consult">GET IN TOUCH <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
