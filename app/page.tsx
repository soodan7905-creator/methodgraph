import Link from "next/link";

const checkpoints = [
  ["01", "목적", "이 영상이 누구에게 어떤 변화를 만들려는지"],
  ["02", "구조", "처음부터 끝까지 관객을 붙잡는 흐름이 있는지"],
  ["03", "판단", "무엇을 남기고 버려야 하는지가 분명한지"],
];

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <p className="eyebrow">VIDEO PROJECT DECISION CHECK</p>
        <h1>영상이 막힌 이유를<br />기술보다 먼저 찾습니다.</h1>
        <p className="hero-copy">
          아이디어, 구성, 편집, 완성도까지. MethodGraph는 정답을 대신 만드는 도구가 아니라
          지금 프로젝트에서 무엇을 판단해야 하는지 보여주는 점검 도구입니다.
        </p>
        <div className="button-row">
          <Link className="button primary" href="/diagnosis">5분 무료 진단 시작</Link>
          <Link className="button secondary" href="/consult">전문가 피드백 보기</Link>
        </div>
        <p className="microcopy">회원가입 없이 시작 · 결과 즉시 확인 · 10개 질문</p>
      </section>

      <section className="dark-section">
        <div className="shell">
          <p className="eyebrow pale">WHAT WE CHECK</p>
          <h2>좋고 나쁨보다, 판단의 근거를 봅니다.</h2>
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
          <h2>무료 진단은 방향을,<br />전문 피드백은 결정을 줍니다.</h2>
        </div>
        <div className="comparison">
          <div>
            <strong>무료 진단</strong>
            <p>10개 공통 질문으로 현재 상태와 우선 보완 영역을 확인합니다.</p>
          </div>
          <div>
            <strong>전문 피드백</strong>
            <p>실제 영상·기획안을 보고 문제 장면, 구조, 다음 수정 순서를 구체적으로 제안합니다.</p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-inner">
          <div>
            <p className="eyebrow">START WITH ONE DECISION</p>
            <h2>지금 가장 먼저 고칠 한 가지를 찾으세요.</h2>
          </div>
          <Link className="button light" href="/diagnosis">무료로 점검하기</Link>
        </div>
      </section>
    </>
  );
}
