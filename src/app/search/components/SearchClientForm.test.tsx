import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchClientForm from './SearchClientForm';

// 모킹된 함수들을 참조하기 위한 변수들
const mockPush = vi.fn();
const mockAddToHistory = vi.fn();

// Next.js navigation 모킹
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Zustand store 모킹
vi.mock('@/store/searchHistoryStore', () => ({
  useSearchHistoryStore: () => ({
    addToHistory: mockAddToHistory,
  }),
}));

// lodash debounce 모킹 (즉시 실행되도록)
vi.mock('lodash', () => ({
  debounce: (fn: () => void) => fn,
}));

describe('SearchClientForm 컴포넌트 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 모킹된 함수들 초기화
    vi.clearAllMocks();
  });

  it('검색 입력 필드와 버튼이 렌더링되어야 함', () => {
    render(<SearchClientForm />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();

    // 검색 가이드와 장바구니 링크도 확인
    expect(screen.getByText('검색 가이드')).toBeInTheDocument();
    expect(screen.getByText('장바구니')).toBeInTheDocument();
  });

  it('사용자가 검색어를 입력할 수 있어야 함', async () => {
    const user = userEvent.setup();
    render(<SearchClientForm />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, '블루아이즈 화이트 드래곤');

    expect(searchInput).toHaveValue('블루아이즈 화이트 드래곤');
  });

  it('폼 제출 시 검색 결과 페이지로 이동해야 함', async () => {
    const user = userEvent.setup();
    render(<SearchClientForm />);

    const searchInput = screen.getByRole('textbox');
    const form = searchInput.closest('form')!;

    const cardName = '블루아이즈';
    const encodedCardName = encodeURIComponent(cardName);

    // 검색어 입력
    await user.type(searchInput, cardName);

    // 폼 제출
    fireEvent.submit(form);

    // router.push가 올바른 URL로 호출되었는지 확인
    expect(mockPush).toHaveBeenCalledWith(
      `/result?cardName=${encodedCardName}&used=false`,
    );
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it('Enter 키 입력 시 검색이 실행되어야 함', async () => {
    const user = userEvent.setup();
    render(<SearchClientForm />);

    const searchInput = screen.getByRole('textbox');
    const cardName = '검은 마술사';
    const encodedCardName = encodeURIComponent(cardName);

    // 검색어 입력 후 Enter
    await user.type(searchInput, `${cardName}{enter}`);

    // router.push가 올바른 URL로 호출되었는지 확인
    expect(mockPush).toHaveBeenCalledWith(
      `/result?cardName=${encodedCardName}&used=false`,
    );
  });

  it('검색 시 검색 기록에 추가되어야 함', async () => {
    const user = userEvent.setup();
    render(<SearchClientForm />);

    const searchInput = screen.getByRole('textbox');
    const form = searchInput.closest('form')!;

    await user.type(searchInput, '엑조디아');
    fireEvent.submit(form);

    // 검색 기록 추가 함수가 호출되었는지 확인
    expect(mockAddToHistory).toHaveBeenCalledWith({
      query: '엑조디아',
      cardName: '엑조디아',
      cardImage: null,
      cardContitions: '신품',
    });
    expect(mockAddToHistory).toHaveBeenCalledTimes(1);
  });

  it('빈 검색어로는 검색이 실행되지 않아야 함', async () => {
    const user = userEvent.setup();
    render(<SearchClientForm />);

    const searchInput = screen.getByRole('textbox');
    const form = searchInput.closest('form')!;

    // 빈 문자열 입력 (공백만)
    await user.type(searchInput, '   ');
    fireEvent.submit(form);

    // router.push가 호출되지 않았는지 확인
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockAddToHistory).not.toHaveBeenCalled();
  });

  it('특수 문자가 포함된 검색어가 올바르게 인코딩되어야 함', async () => {
    const user = userEvent.setup();
    render(<SearchClientForm />);

    const searchInput = screen.getByRole('textbox');
    const form = searchInput.closest('form')!;

    // 특수 문자가 포함된 검색어
    const cardName = '블루아이즈&화이트=드래곤';
    const encodedCardName = encodeURIComponent(cardName);

    await user.type(searchInput, cardName);
    fireEvent.submit(form);

    // URL 인코딩이 올바르게 되었는지 확인
    expect(mockPush).toHaveBeenCalledWith(
      `/result?cardName=${encodedCardName}&used=false`,
    );
  });

  it('장바구니 링크 클릭 시 장바구니 페이지로 이동해야 함', async () => {
    const user = userEvent.setup();
    render(<SearchClientForm />);

    const cartLink = screen.getByText('장바구니');
    await user.click(cartLink);

    expect(mockPush).toHaveBeenCalledWith('/cart');
  });
});
