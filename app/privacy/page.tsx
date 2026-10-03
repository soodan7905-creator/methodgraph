export default function PrivacyPage() {
  return (
    <section className="shell privacy-wrap">
      <p className="eyebrow">PRIVACY</p>
      <h1>Privacy Policy</h1>
      <p className="privacy-updated">Last updated: October 4, 2026</p>

      <div className="privacy-copy">
        <p>
          <span className="notranslate" translate="no" lang="en">CUTTRU</span> collects the information
          you submit when requesting a project review, including your name, email address, project details,
          optional project link, and any diagnosis result connected to the request.
        </p>

        <p>
          We use this information only to understand your project, respond to your request, and discuss
          a possible professional review.
        </p>

        <p>
          Your information may be processed using services that operate
          {" "}<span className="notranslate" translate="no" lang="en">CUTTRU</span>, including Supabase
          and Netlify. Project links are used only for reviewing the request. Please share only material
          you are authorized to provide.
        </p>

        <p>
          Information is kept only as long as reasonably needed to handle the request and related work.
          You may ask for submitted information to be corrected or deleted through the reply channel
          provided after your request.
        </p>
      </div>
    </section>
  );
}
