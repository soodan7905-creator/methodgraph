# CUTTRU

영상 프로젝트를 10개의 판단 축으로 빠르게 점검하고, 더 깊은 피드백이 필요한 사용자를 전문가 리뷰로 연결하는 서비스입니다.

공식 도메인: `cuttru.com`

## 현재 MVP 흐름

1. 랜딩 페이지에서 서비스와 무료 진단 범위를 설명합니다.
2. 사용자가 10개 질문에 1~5점으로 답합니다.
3. 총점과 우선 보완 영역, 다음 판단 지점을 보여줍니다.
4. 실제 프로젝트에 대한 전문 리뷰가 필요한 사용자는 상담을 신청합니다.
5. 신청 내용은 Supabase의 `consultation_requests` 테이블에 저장됩니다.

무료 결과는 프로젝트 파일을 보지 않고 정밀한 처방을 하는 것처럼 보이지 않도록, 판단 기준이 불명확한 영역을 찾는 데 집중합니다.

## 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

`http://localhost:3000`에서 확인할 수 있습니다.

## Supabase 설정

1. Supabase SQL Editor에서 `supabase/schema.sql`을 실행합니다.
2. `.env.local`에 Supabase URL과 publishable/anon key를 입력합니다.
3. 배포할 때도 같은 변수를 Netlify 환경 변수에 등록합니다.

## 환경 변수

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

## 배포 전 남은 결정

- `cuttru.com` Netlify 도메인 연결
- 유료 리뷰 상품명, 가격, 납기
- 개인정보처리방침에 넣을 운영자 정보와 보관 기간
