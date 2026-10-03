# MethodGraph

영상 프로젝트를 10개의 판단 축으로 빠르게 점검하고, 더 깊은 피드백이 필요한 사용자를 전문가 상담으로 연결하는 서비스입니다.

## 현재 MVP 흐름

1. 랜딩 페이지에서 서비스와 무료 진단 범위를 설명합니다.
2. 사용자가 10개 질문에 1~5점으로 답합니다.
3. 총점, 강점, 우선 보완 영역과 즉시 실행할 한 가지 행동을 보여줍니다.
4. 사용자가 전문가 피드백을 신청하면 Supabase의 `consultation_requests` 테이블에 저장합니다.

무료 결과는 일부러 일반적인 방향 제시까지만 제공합니다. 프로젝트 파일을 보지 않고 정밀한 처방을 하는 것처럼 보이지 않도록 설계했습니다.

## 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

`http://localhost:3000`에서 확인할 수 있습니다.

## Supabase 설정

1. Supabase SQL Editor에서 `supabase/schema.sql`을 실행합니다.
2. `.env.local`에 Supabase URL과 anon key를 입력합니다.
3. 배포할 때도 같은 변수를 Netlify 또는 Vercel 환경 변수에 등록합니다.

Supabase 변수가 없어도 무료 진단까지는 동작합니다. 상담 신청 저장만 비활성화됩니다.

## 환경 변수

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

## 배포 전 남은 결정

- 상담 신청 후 실제 회신 방식과 응답 시간
- 유료 피드백 상품명, 가격, 납기
- 개인정보처리방침에 넣을 운영자 정보와 보관 기간
