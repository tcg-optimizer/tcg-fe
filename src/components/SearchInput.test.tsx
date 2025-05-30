import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';

describe('SearchInput 컴포넌트 테스트', () => {
  it('검색 입력 필드가 렌더링되어야 함', () => {
    render(<SearchInput />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });

  it('기본 플레이스홀더 텍스트가 표시되어야 함', () => {
    render(<SearchInput />);

    const searchInput = screen.getByPlaceholderText(/검색어를 입력해주세요./i);
    expect(searchInput).toBeInTheDocument();
  });

  it('커스텀 플레이스홀더가 표시되어야 함', () => {
    const customKeyword = '카드명을 입력하세요';
    render(<SearchInput keyword={customKeyword} />);

    const searchInput = screen.getByPlaceholderText(customKeyword);
    expect(searchInput).toBeInTheDocument();
  });

  it('value prop이 올바르게 표시되어야 함', () => {
    const testValue = '블루아이즈 화이트 드래곤';
    render(<SearchInput value={testValue} />);

    const searchInput = screen.getByDisplayValue(testValue);
    expect(searchInput).toBeInTheDocument();
  });

  it('onChange 핸들러가 호출되어야 함', async () => {
    const mockOnChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchInput onChange={mockOnChange} />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'test');

    // 각 문자 입력마다 onChange가 호출되는지 확인
    expect(mockOnChange).toHaveBeenCalledTimes(4);
  });

  it('검색 버튼이 렌더링되어야 함', () => {
    render(<SearchInput />);

    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
  });

  it('커스텀 클래스명이 적용되어야 함', () => {
    const customClass = 'custom-search-input';
    render(<SearchInput className={customClass} />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveClass(customClass);
  });

  it('검색 버튼에 올바른 아이콘이 표시되어야 함', () => {
    render(<SearchInput />);

    const searchButton = screen.getByRole('button');
    const searchIcon = searchButton.querySelector('svg');

    expect(searchIcon).toBeInTheDocument();
  });

  it('submit 타입의 버튼이어야 함', () => {
    render(<SearchInput />);

    const searchButton = screen.getByRole('button');
    expect(searchButton).toHaveAttribute('type', 'submit');
  });
});
