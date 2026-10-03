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
    const response = await fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries())),
    });
    const data = await response.json();
    if (response.ok) {
      setState("success");
      setMessage("신청이 접수됐습니다. 내용을 확인한 뒤 연락드리겠습니다.");
      formElement.reset();
    } else {
      setState("error");
      setMessage(data.error ?? "현재 신청을 저장할 수 없습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  return (
    <form className="consult-form" onSubmit={submit}>
      <input type="hidden" name="diagnosis_score" value={params.get("score") ?? ""} />
      <input type="hidden" name="diagnosis_focus" value={params.get("focus") ?? ""} />
      <label>이름 또는 활동명<input name="name" required maxLength={80} /></label>
      <label>회신받을 이메일<input name="email" type="email" required maxLength={160} /></label>
      <label>프로젝트 유형
        <select name="project_type" required defaultValue="">
          <option value="" disabled>선택해 주세요</option>
          <option>유튜브·채널 영상</option>
          <option>브랜드·홍보 영상</option>
          <option>영화·예고편</option>
          <option>다큐멘터리·인터뷰</option>
          <option>기타 영상 프로젝트</option>
        </select>
      </label>
      <label>현재 가장 막힌 지점<textarea name="challenge" required rows={6} maxLength={1500} placeholder="무엇을 만들고 있으며, 어디서 판단이 막혔는지 적어주세요." /></label>
      <label className="consent"><input type="checkbox" name="privacy_consent" value="true" required /> 상담 회신을 위해 입력한 정보를 수집·이용하는 데 동의합니다.</label>
      <button className="button primary" disabled={state === "sending"}>{state === "sending" ? "접수 중…" : "검토 가능 여부 문의"}</button>
      {message && <p className={`form-message ${state}`}>{message}</p>}
    </form>
  );
}

export default function ConsultPage() {
  return (
    <section className="shell consult-wrap">
      <div className="consult-intro">
        <p className="eyebrow">PROFESSIONAL FEEDBACK</p>
        <h1>결과가 아니라<br />다음 판단을 드립니다.</h1>
        <p>기획안이나 실제 영상을 보고 문제의 원인, 살려야 할 장점, 먼저 수정할 순서를 제안합니다. 신청 내용을 확인한 후 검토 가능 범위와 비용을 먼저 안내합니다.</p>
        <ul>
          <li>프로젝트 목적과 대상 점검</li>
          <li>구조·리듬·정보량의 문제 구간 확인</li>
          <li>수정 우선순위와 구체적 다음 단계 제안</li>
        </ul>
      </div>
      <Suspense fallback={<p>신청서를 준비하고 있습니다…</p>}><ConsultForm /></Suspense>
    </section>
  );
}
