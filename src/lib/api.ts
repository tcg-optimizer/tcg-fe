// 내부 API 라우트 URL 생성 함수
export function getBaseUrl() {
  // 서버 사이드인 경우
  if (typeof window === 'undefined') {
    // 환경 변수에서 URL 가져오기, 없으면 기본값 사용
    return process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
  }
  // 클라이언트 사이드인 경우 상대 경로 사용
  return '';
}

// 내부 API 라우트 URL
export const API_ROUTE_URL = `${getBaseUrl()}/api/cards`;
