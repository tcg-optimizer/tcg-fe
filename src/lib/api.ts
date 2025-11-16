// 내부 API 라우트 URL 생성 함수
export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || '';
}

// 내부 API 라우트 URL
export const API_ROUTE_URL = `${getBaseUrl()}/api/cards`;
