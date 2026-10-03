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
        <h1>Before you recut another scene,<br />find the decision that is actually holding your project back.</h1>
        <p className="hero-copy">
          A 5-minute project check built from 25 years of professional editing judgment.
          Clarify the problem before you spend more time rewriting, reshooting, or recutting.
        </p>
        <div className="button-row">
          <Link className="button primary" href="/diagnosis">Start the free project check</Link>
          <Link className="button secondary" href="/consult">Have me review the actual project</Link>
        </div>
        <p className="microcopy">No sign-up · Instant result · 10 questions</p>
      </section>

      <section className="dark-section">
        <div className="shell">
          <p className="eyebrow pale">WHAT WE CHECK</p>
          <h2>Not whether the video is “good” or “bad,”<br />but whether your decisions have a clear basis.</h2>
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
          <h2>The free check clarifies the problem.<br />Professional review applies judgment to the actual work.</h2>
        </div>
        <div className="comparison">
          <div>
            <strong>Free project check</strong>
            <p>Ten questions show where your decision criteria are clear and where they are still vague.</p>
          </div>
          <div>
            <strong>Professional project review</strong>
            <p>I review the actual treatment, rough cut, or finished video and identify the core problem, what is already working, and the order I would revise it.</p>
          </div>
        </div>
      </section>

      <section className="dark-section">
        <div className="shell split-section">
          <div>
            <p className="eyebrow pale">BUILT ON EDITORIAL JUDGMENT</p>
            <h2>CUTTRU comes from real editing work, not a generic scoring model.</h2>
          </div>
          <div className="comparison">
            <div>
              <strong>SOODAN PARK · 25 years of editing experience</strong>
              <p>Commercial films, trailers, and long-form storytelling shaped the questions behind this check.</p>
            </div>
            <div>
              <strong>Judgment before technique</strong>
              <p>The free check helps you name the problem. The professional review applies that judgment to your actual project.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-inner">
          <div>
            <p className="eyebrow">START WITH ONE DECISION</p>
            <h2>Find the one thing you should examine before your next revision.</h2>
          </div>
          <Link className="button light" href="/diagnosis">Check your project</Link>
        </div>
      </section>
    </>
  );
}
