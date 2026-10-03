"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const questions = [
  { axis: "목적", text: "이 영상이 누구를 위한 것이며, 보고 난 뒤 무엇이 달라져야 하는지 한 문장으로 말할 수 있다." },
  { axis: "핵심", text: "관객이 반드시 기억해야 할 한 가지가 분명하다." },
  { axis: "대상", text: "내가 보여주고 싶은 것보다 목표 관객이 필요로 하는 것을 기준으로 판단하고 있다." },
  { axis: "구조", text: "도입·전개·마무리의 역할이 구분되고 장면의 순서에 이유가 있다." },
  { axis: "집중", text: "없어도 의미가 유지되는 설명, 장면, 반복을 덜어낼 수 있다." },
  { axis: "감정", text: "관객이 어느 지점에서 궁금해하고 긴장하거나 공감해야 하는지 설계되어 있다." },
  { axis: "증거", text: "주장을 설명으로만 말하지 않고 장면, 인물, 사례 또는 행동으로 보여준다." },
  { axis: "리듬", text: "빠르기보다 정보량과 감정의 변화에 맞춰 영상의 속도를 조절하고 있다." },
  { axis: "완성", text: "수정할 때마다 좋아지는 기준이 있고, 취향만으로 결정을 뒤집지 않는다." },
  { axis: "실행", text: "다음 수정에서 무엇을 먼저 바꿀지 한 가지로 정할 수 있다." },
];

const labels = ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"];

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
    const level = score >= 42 ? "판단 기준이 비교적 선명합니다" : score >= 30 ? "방향은 있으나 우선순위가 필요합니다" : "기준보다 감각에 의존하고 있을 가능성이 큽니다";
    return (
      <section className="shell result-wrap">
        <p className="eyebrow">YOUR RESULT</p>
        <div className="score-card">
          <span>총점</span>
          <strong>{score}<small>/50</small></strong>
          <h1>{level}</h1>
          <p>이 점수는 작품의 우열이 아니라 현재 프로젝트의 판단 기준이 얼마나 정리되어 있는지를 보여줍니다.</p>
        </div>
        <div className="result-grid">
          <div className="result-panel">
            <p className="panel-label">우선 보완 영역</p>
            {weakest.map((item) => (
              <div className="weak-item" key={item.axis}>
                <strong>{item.axis}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="result-panel accent-panel">
            <p className="panel-label">가장 작은 다음 행동</p>
            <h2>가장 낮은 항목 하나만 골라, 현재 영상에서 그것을 증명하거나 방해하는 장면을 각각 하나씩 적어보세요.</h2>
            <p>무료 진단은 여기까지입니다. 실제 장면을 기준으로 무엇을 버리고 살릴지는 전문가 검토가 필요합니다.</p>
          </div>
        </div>
        <div className="button-row centered">
          <Link className="button primary" href={`/consult?score=${score}&focus=${encodeURIComponent(weakest.map((x) => x.axis).join(", "))}`}>내 프로젝트 피드백 신청</Link>
          <button className="button secondary" onClick={() => setSubmitted(false)}>답변 다시 보기</button>
        </div>
      </section>
    );
  }

  return (
    <section className="shell diagnosis-wrap">
      <div className="diagnosis-head">
        <div>
          <p className="eyebrow">FREE DIAGNOSIS</p>
          <h1>영상 프로젝트 판단 점검</h1>
          <p>완성도 평가가 아닙니다. 현재 프로젝트에 판단 기준이 있는지 점검합니다.</p>
        </div>
        <div className="progress-copy">{completed} / {questions.length}</div>
      </div>
      <div className="progress"><span style={{ width: `${completed * 10}%` }} /></div>
      <div className="question-list">
        {questions.map((question, index) => (
          <fieldset className="question-card" key={question.axis}>
            <legend><span>{String(index + 1).padStart(2, "0")}</span><strong>{question.axis}</strong></legend>
            <p>{question.text}</p>
            <div className="scale" role="radiogroup" aria-label={`${question.axis} 점수`}>
              {labels.map((label, labelIndex) => {
                const value = labelIndex + 1;
                return (
                  <label className={answers[index] === value ? "selected" : ""} key={label}>
                    <input type="radio" name={`question-${index}`} value={value} checked={answers[index] === value}
                      onChange={() => setAnswers((current) => current.map((item, i) => i === index ? value : item))} />
                    <b>{value}</b><span>{label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <button className="button primary submit-button" disabled={completed !== questions.length}
        onClick={() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
        {completed === questions.length ? "진단 결과 보기" : `${questions.length - completed}개 문항이 남았습니다`}
      </button>
    </section>
  );
}
