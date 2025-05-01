import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/cards';

// POST 요청 처리 함수
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 필수 파라미터 검증
    if (!body.cards || !Array.isArray(body.cards) || body.cards.length === 0) {
      return NextResponse.json(
        { error: '카드 정보가 올바르게 제공되지 않았습니다.' },
        { status: 400 },
      );
    }

    // 외부 API 호출
    const response = await fetch(`${API_BASE_URL}/optimal-purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: errorData.error || '최적 구매 조합을 계산하는데 실패했습니다.',
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    // 응답 데이터 반환
    return NextResponse.json(data);
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
