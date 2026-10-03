import Link from "next/link";

const checkpoints = [
  ["01", "Purpose", "Who this video is for and what it should change for them"],
  ["02", "Structure", "Whether the flow keeps the audience engaged from start to finish"],
  ["03", "Judgment", "Whether you know what to keep, cut, and prioritize"],
];

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <p className="eyebrow">VIDEO PROJECT DECISION CHECK</p>
        <h1>Find what is blocking your video<br />before blaming the technique.</h1>
        <p className="hero-copy">
          From idea and structure to editing and final polish, MethodGraph does not make the decisions for you.
          It helps you see which decisions your project actually needs.
        </p>
        <div className="button-row">
          <Link className="button primary" href="/diagnosis">Start the 5-minute free check</Link>
          <Link className="button secondary" href="/consult">See professional review</Link>
        </div>
        <p className="microcopy">No sign-up · Instant result · 10 questions</p>
      </section>

      <section className="dark-section">
        <div className="shell">
          <p className="eyebrow pale">WHAT WE CHECK</p>
          <h2>Not whether it is “good” or “bad,”<br />but whether your decisions have a clear basis.</h2>
          <div className="checkpoint-grid">
            {checkpoints.map(([number, title, copy]) => (
              <article key={number} className="checkpoint">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell split-section">
        <div>
          <p className="eyebrow">FREE VS. PROFESSIONAL</p>
          <h2>The free check gives you direction.<br />Professional review helps you decide what to change.</h2>
        </div>
        <div className="comparison">
          <div>
            <strong>Free project check</strong>
            <p>Ten common questions reveal your current decision-making strengths and the areas that need priority.</p>
          </div>
          <div>
            <strong>Professional review</strong>
            <p>I review your actual video or treatment and identify problem sections, structural issues, and the order of revisions.</p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-inner">
          <div>
            <p className="eyebrow">START WITH ONE DECISION</p>
            <h2>Find the one thing you should fix first.</h2>
          </div>
          <Link className="button light" href="/diagnosis">Check your project</Link>
        </div>
      </section>
    </>
  );
}
