import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/cards';

// GET 요청 처리 함수
export async function GET(request: NextRequest) {
  try {
    // URL에서 쿼리 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const cardName = searchParams.get('cardName');
    const includeUsed = searchParams.get('includeUsed') === 'true';

    if (!cardName) {
      return NextResponse.json(
        { error: '카드 이름이 제공되지 않았습니다.' },
        { status: 400 },
      );
    }

    // 외부 API 호출
    const response = await fetch(
      `${API_BASE_URL}/rarity-prices?cardName=${encodeURIComponent(
        cardName,
      )}&includeUsed=${includeUsed}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // 항상 최신 데이터 가져오기
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: errorData.error || '카드 가격 정보를 가져오는데 실패했습니다.',
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
