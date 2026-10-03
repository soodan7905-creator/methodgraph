"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const questions = [
  { axis: "Purpose", text: "I can explain in one sentence who this video is for and what should change for them after watching it." },
  { axis: "Core", text: "There is one thing the audience absolutely needs to remember." },
  { axis: "Audience", text: "I make decisions based on what the target audience needs, not only on what I want to show." },
  { axis: "Structure", text: "The opening, development, and ending each have a clear role, and there is a reason for the order of scenes." },
  { axis: "Focus", text: "I can remove explanations, scenes, or repetition that are not necessary to preserve the meaning." },
  { axis: "Emotion", text: "I know where the audience should become curious, tense, moved, or emotionally engaged." },
  { axis: "Evidence", text: "The video shows ideas through scenes, people, examples, or actions instead of relying only on explanation." },
  { axis: "Rhythm", text: "I adjust pacing to the amount of information and emotional change, rather than simply making the video faster." },
  { axis: "Finish", text: "I have a clear standard for whether each revision improves the project, rather than changing decisions by taste alone." },
  { axis: "Action", text: "I can name the single most important thing to change in the next revision." },
];

const labels = ["Not at all", "Mostly no", "Somewhat", "Mostly yes", "Definitely"];

export default function DiagnosisPage() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [submitted, setSubmitted] = useState(false);
  const completed = answers.filter(Boolean).length;
  const score = answers.reduce((sum, value) => sum + value, 0);
  const weakest = useMemo(() => questions
    .map((question, index) => ({ ...question, value: answers[index] }))
    .sort((a, b) => a.value - b.value)
    .slice(0, 2), [answers]);

  if (submitted) {
    const level = score >= 42
      ? "Your decision criteria are relatively clear."
      : score >= 30
        ? "You have direction, but your priorities need sharpening."
        : "Your project may be relying more on instinct than explicit criteria.";

    return (
      <section className="shell result-wrap">
        <p className="eyebrow">YOUR RESULT</p>
        <div className="score-card">
          <span>Total score</span>
          <strong>{score}<small>/50</small></strong>
          <h1>{level}</h1>
          <p>This score does not rate the quality of your work. It shows how clearly your current project decisions are defined.</p>
        </div>

        <div className="result-grid">
          <div className="result-panel">
            <p className="panel-label">Priority areas</p>
            {weakest.map((item) => (
              <div className="weak-item" key={item.axis}>
                <strong>{item.axis}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="result-panel accent-panel">
            <p className="panel-label">What this result can tell you</p>
            <h2>Your lowest-scoring area is not necessarily the worst part of the video.</h2>
            <p>It is the area where your decision criteria are least clear right now.</p>
          </div>
        </div>

        <div className="result-grid">
          <div className="result-panel">
            <p className="panel-label">What this result cannot tell you</p>
            <h2>It cannot tell you which scene to cut, which idea to protect, or what to change first without seeing the actual project.</h2>
            <p>That is where professional review begins.</p>
          </div>

          <div className="result-panel accent-panel">
            <p className="panel-label">Smallest useful next step</p>
            <h2>Choose your lowest-scoring area. Find one scene that supports it and one scene that works against it.</h2>
            <p>If that answer is still unclear, send me the project and I’ll identify the core problem, what is already working, and the revision order I would recommend.</p>
          </div>
        </div>

        <div className="button-row centered">
          <Link className="button primary" href={"/consult?score=" + score + "&focus=" + encodeURIComponent(weakest.map((x) => x.axis).join(", "))}>
            Have me review the actual project
          </Link>
          <button className="button secondary" onClick={() => setSubmitted(false)}>Review my answers</button>
        </div>
      </section>
    );
  }

  return (
    <section className="shell diagnosis-wrap">
      <div className="diagnosis-head">
        <div>
          <p className="eyebrow">FREE PROJECT CHECK</p>
          <h1>Video Project Decision Check</h1>
          <p>This is not a quality score. It checks whether your project has clear decision criteria.</p>
        </div>
        <div className="progress-copy">{completed} / {questions.length}</div>
      </div>
      <div className="progress"><span style={{ width: (completed * 10) + "%" }} /></div>
      <div className="question-list">
        {questions.map((question, index) => (
          <fieldset className="question-card" key={question.axis}>
            <legend><span>{String(index + 1).padStart(2, "0")}</span><strong>{question.axis}</strong></legend>
            <p>{question.text}</p>
            <div className="scale" role="radiogroup" aria-label={question.axis + " score"}>
              {labels.map((label, labelIndex) => {
                const value = labelIndex + 1;
                return (
                  <label className={answers[index] === value ? "selected" : ""} key={label}>
                    <input
                      type="radio"
                      name={"question-" + index}
                      value={value}
                      checked={answers[index] === value}
                      onChange={() => setAnswers((current) => current.map((item, i) => i === index ? value : item))}
                    />
                    <b>{value}</b><span>{label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <button
        className="button primary submit-button"
        disabled={completed !== questions.length}
        onClick={() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      >
        {completed === questions.length ? "View my result" : (questions.length - completed) + " questions remaining"}
      </button>
    </section>
  );
}
