'use client';

import { useRef, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useSearchHistoryStore } from '@/store/searchHistoryStore';

// 서버에서 렌더링된 후 클라이언트에서 스토어 상태 초기화를 위한 컴포넌트
export default function StoreInitializer() {
  const initialized = useRef(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되고, 한 번만 실행되도록 함
    if (!initialized.current) {
      initialized.current = true;

      // Zustand persist 스토어 hydration
      useCartStore.persist.rehydrate();
      useSearchHistoryStore.persist.rehydrate();
    }
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
}
