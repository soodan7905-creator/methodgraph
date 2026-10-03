"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ConsultForm() {
  const params = useSearchParams();
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const entries = Object.fromEntries(form.entries());

    const response = await fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entries),
    });

    const data = await response.json();

    if (!response.ok) {
      setState("error");
      setMessage(data.error ?? "Your request could not be saved. Please try again shortly.");
      return;
    }

    try {
      const netlifyBody = new URLSearchParams();
      netlifyBody.set("form-name", "project-review");
      netlifyBody.set("bot-field", "");
      for (const [key, value] of form.entries()) {
        netlifyBody.set(key, String(value));
      }

      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: netlifyBody.toString(),
      });
    } catch {
      // Supabase remains the source of truth even if the notification submission fails.
    }

    setState("success");
    setMessage("Your request has been received. I’ll review it and contact you with the next step.");
    formElement.reset();
  }

  return (
    <form className="consult-form" onSubmit={submit}>
      <input type="hidden" name="diagnosis_score" value={params.get("score") ?? ""} />
      <input type="hidden" name="diagnosis_focus" value={params.get("focus") ?? ""} />

      <label>
        Name or creator name
        <input name="name" required maxLength={80} />
      </label>

      <label>
        Email
        <input name="email" type="email" required maxLength={160} />
      </label>

      <label>
        Project type
        <select name="project_type" required defaultValue="">
          <option value="" disabled>Select a project type</option>
          <option>YouTube / channel video</option>
          <option>Brand / promotional video</option>
          <option>Film / trailer</option>
          <option>Documentary / interview</option>
          <option>Other video project</option>
        </select>
      </label>

      <label>
        Project stage
        <select name="project_stage" required defaultValue="">
          <option value="" disabled>Select the current stage</option>
          <option>Idea / concept</option>
          <option>Treatment / script</option>
          <option>Rough cut</option>
          <option>Fine cut / near final</option>
          <option>Finished video</option>
        </select>
      </label>

      <label>
        Project link <span className="optional">(optional)</span>
        <input
          name="project_link"
          type="url"
          maxLength={500}
          placeholder="YouTube, Vimeo, Frame.io, Google Drive, etc."
        />
      </label>

      <label>
        Where are you most stuck?
        <textarea
          name="challenge"
          required
          rows={6}
          maxLength={1500}
          placeholder="Tell me what you are making and where the decision-making has stalled."
        />
      </label>

      <label className="consent">
        <input type="checkbox" name="privacy_consent" value="true" required />
        I agree that the information I submit may be used to respond to this review request.
      </label>

      <button className="button primary" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Ask about a project review"}
      </button>

      {message && <p className={"form-message " + state}>{message}</p>}
    </form>
  );
}

export default function ConsultPage() {
  return (
    <section className="shell consult-wrap">
      <div className="consult-intro">
        <p className="eyebrow">PROFESSIONAL REVIEW</p>
        <h1>Not another score.<br />A clearer next decision.</h1>
        <p className="reviewer-credit">Reviewed by <strong>SOODAN PARK</strong> · Film &amp; Trailer Editor</p>
        <p>
          I review your treatment, rough cut, or finished video to identify the real problem,
          the strengths worth protecting, and the order in which I would revise the project.
          After reading your request, I’ll first confirm the scope, price, and turnaround.
        </p>
        <ul>
          <li>Purpose and audience</li>
          <li>Structure, rhythm, and information load</li>
          <li>Revision priorities and concrete next steps</li>
        </ul>
      </div>

      <Suspense fallback={<p>Preparing the request form…</p>}>
        <ConsultForm />
      </Suspense>
    </section>
  );
}
