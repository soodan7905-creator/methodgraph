export default function PrivacyPage() {
  return (
    <section className="shell privacy-wrap">
      <p className="eyebrow">PRIVACY</p>
      <h1>Privacy Policy</h1>
      <p className="privacy-updated">Last updated: October 4, 2026</p>

      <div className="privacy-copy">
        <h2>What we collect</h2>
        <p>
          When you request a professional project review, CUTTRU may collect your name,
          email address, project type, project stage, project link, the challenge you describe,
          and your free-check score or priority area if you came from the diagnosis page.
        </p>

        <h2>How we use it</h2>
        <p>
          This information is used to review your request, understand the context of your project,
          respond to you, and discuss the scope, price, and turnaround of a possible review.
        </p>

        <h2>Project links and submitted material</h2>
        <p>
          Any project link you provide is used only for evaluating your review request.
          Please submit only material that you are authorized to share.
        </p>

        <h2>Storage and service providers</h2>
        <p>
          Review request data may be processed and stored through service providers used to operate
          CUTTRU, including Supabase for form data and Netlify for site hosting and form notifications.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Review request information is kept only as long as reasonably needed to respond to the request,
          manage any resulting review work, and maintain necessary business records. Information that is no
          longer needed may be deleted.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask for your submitted information to be corrected or deleted by replying to the email
          conversation related to your review request.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions, contact CUTTRU through the same email channel used for your project review request.
        </p>
      </div>
    </section>
  );
}
