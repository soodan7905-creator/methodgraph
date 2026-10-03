import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "상담 접수 연결이 아직 설정되지 않았습니다." }, { status: 503 });
  }

  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const projectType = String(body.project_type ?? "").trim();
  const challenge = String(body.challenge ?? "").trim();
  if (!name || !email || !projectType || !challenge || body.privacy_consent !== "true") {
    return NextResponse.json({ error: "필수 항목과 개인정보 동의를 확인해 주세요." }, { status: 400 });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("consultation_requests").insert({
    name,
    email,
    project_type: projectType,
    challenge,
    diagnosis_score: body.diagnosis_score ? Number(body.diagnosis_score) : null,
    diagnosis_focus: String(body.diagnosis_focus ?? "") || null,
  });
  if (error) return NextResponse.json({ error: "신청을 저장하지 못했습니다." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
