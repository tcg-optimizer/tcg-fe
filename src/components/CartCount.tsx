'use client';

import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';

export default function CartCount() {
  const cartItems = useCartStore((state) => state.items);
  // SSR과 hydration 불일치 문제를 방지하기 위해 클라이언트 측에서만 표시
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 클라이언트에서만 개수 계산
  if (!mounted) return null;

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-red-500 text-white rounded-full">
      {itemCount}
    </span>
  );
}
