import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const allowedStages = new Set([
  "Idea / concept",
  "Treatment / script",
  "Rough cut",
  "Fine cut / near final",
  "Finished video",
]);

export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: "The review request service is not configured yet." }, { status: 503 });
  }

  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const projectType = String(body.project_type ?? "").trim();
  const projectStage = String(body.project_stage ?? "").trim();
  const projectLink = String(body.project_link ?? "").trim();
  const challenge = String(body.challenge ?? "").trim();

  if (!name) {
    return NextResponse.json({ error: "Please enter your name or creator name." }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ error: "Please enter your email." }, { status: 400 });
  }
  if (!projectType) {
    return NextResponse.json({ error: "Please select a project type." }, { status: 400 });
  }
  if (!projectStage || !allowedStages.has(projectStage)) {
    return NextResponse.json({ error: "Please select a valid project stage." }, { status: 400 });
  }
  if (!challenge) {
    return NextResponse.json({ error: "Please tell me where you are most stuck." }, { status: 400 });
  }
  if (body.privacy_consent !== "true") {
    return NextResponse.json({ error: "Please accept the privacy consent." }, { status: 400 });
  }

  if (projectLink.length > 500) {
    return NextResponse.json({ error: "The project link is too long." }, { status: 400 });
  }

  if (projectLink) {
    try {
      new URL(projectLink);
    } catch {
      return NextResponse.json({ error: "Please enter a valid project link beginning with http:// or https://." }, { status: 400 });
    }
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("consultation_requests").insert({
    name,
    email,
    project_type: projectType,
    project_stage: projectStage,
    project_link: projectLink || null,
    challenge,
    diagnosis_score: body.diagnosis_score ? Number(body.diagnosis_score) : null,
    diagnosis_focus: String(body.diagnosis_focus ?? "") || null,
  });

  if (error) {
    return NextResponse.json({ error: "Your request could not be saved." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
