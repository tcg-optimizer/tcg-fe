'use client';

import { useEffect, useState } from 'react';

// 클라이언트 사이드에서만 장바구니 데이터에 접근하기 위한 래퍼 컴포넌트
export default function CartClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR 첫 렌더링과 클라이언트 hydration 불일치 방지
  if (!mounted) {
    return <div className="p-8 text-center">장바구니를 불러오는 중...</div>;
  }

  return <>{children}</>;
}
