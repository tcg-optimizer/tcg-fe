import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 각 테스트 후 자동으로 정리
afterEach(() => {
  cleanup();
});

// React 19 환경 변수 설정
// @ts-expect-error - 타입 오류 무시
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
