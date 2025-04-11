import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 자동으로 / -> /search 로 리다이렉트
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/search', request.url));
  }
  return NextResponse.next();
}
