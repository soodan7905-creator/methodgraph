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
    setMessage("Your project inquiry has been received. I’ll review it and follow up with the next step.");
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
          <option value="YouTube / channel video">YouTube / channel video</option>
          <option value="Brand / promotional video">Brand / promotional video</option>
          <option value="Film / trailer">Film / trailer</option>
          <option value="Documentary / interview">Documentary / interview</option>
          <option value="Other video project">Other video project</option>
        </select>
      </label>

      <label>
        Project stage
        <select name="project_stage" required defaultValue="">
          <option value="" disabled>Select the current stage</option>
          <option value="Idea / concept">Idea / concept</option>
          <option value="Treatment / script">Treatment / script</option>
          <option value="Rough cut">Rough cut</option>
          <option value="Fine cut / near final">Fine cut / near final</option>
          <option value="Finished video">Finished video</option>
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
        Tell me about your project
        <textarea
          name="challenge"
          required
          rows={6}
          maxLength={1500}
          placeholder="What are you making, what kind of editing or review do you need, and what is your timeline?"
        />
      </label>

      <label className="consent">
        <input type="checkbox" name="privacy_consent" value="true" required />
        <span>
          I agree that the information I submit may be used to respond to this review request.{" "}
          <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
        </span>
      </label>

      <button className="button primary" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send project inquiry"}
      </button>

      {message && <p className={"form-message " + state}>{message}</p>}
    </form>
  );
}

export default function ConsultPage() {
  return (
    <section className="shell consult-wrap">
      <div className="consult-intro">
        <p className="eyebrow">PROJECT INQUIRY</p>
        <h1>Let’s make<br />your story stronger.</h1>
        <p className="reviewer-credit">Film, trailer and storytelling expertise shaped by 25 years of professional editing.</p>
        <p>
          Bring your trailer, brand video, rough cut or story project. I provide editing, editorial direction, and project review depending on your needs. After reading your inquiry, I’ll confirm the scope, fee, and timeline before any work begins.
        </p>
        <ul>
          <li>Trailers, teasers and promos</li>
          <li>Brand and story-driven video editing</li>
          <li>Editorial direction and project review</li>
        </ul>
      </div>

      <Suspense fallback={<p>Preparing the request form…</p>}>
        <ConsultForm />
      </Suspense>
    </section>
  );
}
