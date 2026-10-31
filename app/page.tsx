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
            <a className="studio-button studio-button-mint" href="#work">VIEW SELECTED WORK <span aria-hidden="true">↓</span></a>
            <Link className="studio-text-link" href="/consult">START A PROJECT <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="studio-hero-aside" aria-hidden="true">STORY<br />EDITING<br />EMOTION<br />IMPACT</div>
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
          <p>SELECTED TRAILERS</p>
          <span>FILM TRAILER PORTFOLIO</span>
        </div>
        <p className="studio-work-intro">
          A selection of theatrical trailer projects. Select a film poster to view the corresponding
          work on O-VATION, my original film-trailer portfolio.
        </p>
        <div className="studio-work-grid">
          <a
            className="studio-work-card"
            href="https://www.o-vation.co.kr/blank-q17v5?pgid=irkm5hav-481bb790-636b-4c82-a744-ba7f26c87399"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View The Admiral (Myeongryang) trailer in the O-VATION portfolio"
          >
            <div className="studio-work-poster">
              <img
                src="https://image.tmdb.org/t/p/original/mwUpAoYxzLNkkbYknCXzSi0NuGv.jpg"
                alt="The Admiral (Myeongryang, 2014) theatrical poster"
                loading="lazy"
              />
              <span className="studio-poster-view">VIEW TRAILER <span aria-hidden="true">↗</span></span>
            </div>
            <div className="studio-work-caption">
              <h3>THE ADMIRAL <span>명량</span></h3>
              <p>2014 · THEATRICAL TRAILER</p>
            </div>
          </a>
          <a
            className="studio-work-card"
            href="https://www.o-vation.co.kr/blank-q17v5?pgid=irkm5hav-93de2ab3-4ad1-4e22-91d9-3d9f894e8a4b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View The Pirates (Haejeok) trailer in the O-VATION portfolio"
          >
            <div className="studio-work-poster">
              <img
                src="https://www.asianmovieweb.com/de/pictures/movie/the_pirates/fullsize_poster.jpg"
                alt="The Pirates (Haejeok, 2014) theatrical poster"
                loading="lazy"
              />
              <span className="studio-poster-view">VIEW TRAILER <span aria-hidden="true">↗</span></span>
            </div>
            <div className="studio-work-caption">
              <h3>THE PIRATES <span>해적</span></h3>
              <p>2014 · THEATRICAL TRAILER</p>
            </div>
          </a>
          <aside className="studio-work-archive">
            <p className="studio-overline">THE ORIGINAL PORTFOLIO</p>
            <h3>More films.<br /><em>More stories.</em></h3>
            <p>
              O-VATION is my existing film-trailer portfolio website. It brings together
              additional film trailers and editing work beyond the selections shown here.
            </p>
            <a
              className="studio-text-link"
              href="https://www.o-vation.co.kr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              EXPLORE O-VATION <span aria-hidden="true">↗</span>
            </a>
            <span className="studio-archive-footnote">O-VATION / FILM TRAILER ARCHIVE</span>
          </aside>
        </div>
        <p className="studio-disclaimer">
          Film posters identify the productions. The poster images are promotional materials;
          the linked pages contain my trailer work.
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
