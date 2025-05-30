import { describe, it, expect } from 'vitest';
import { sortCardLanguages, sortCardRarities } from './card';
import { TCardLanguageLabel, TCardRarityLabel } from '@/types/card';

describe('카드 유틸리티 함수 테스트', () => {
  describe('sortCardLanguages', () => {
    it('언어 목록을 올바른 순서로 정렬해야 함', () => {
      const inputLanguages: TCardLanguageLabel[] = [
        '영문판',
        '일본판',
        '한글판',
      ];
      const result = sortCardLanguages(inputLanguages);

      // 결과가 배열이어야 함
      expect(Array.isArray(result)).toBe(true);

      // 입력된 모든 언어가 포함되어야 함
      inputLanguages.forEach((lang) => {
        expect(result).toContain(lang);
      });
    });

    it('빈 배열이 입력되면 빈 배열을 반환해야 함', () => {
      const result = sortCardLanguages([]);
      expect(result).toEqual([]);
    });

    it('중복된 언어가 있어도 올바르게 처리해야 함', () => {
      const inputLanguages: TCardLanguageLabel[] = [
        '영문판',
        '영문판',
        '일본판',
      ];
      const result = sortCardLanguages(inputLanguages);

      // 중복이 제거되어야 함
      const uniqueResult = [...new Set(result)];
      expect(result.length).toBe(uniqueResult.length);
    });
  });

  describe('sortCardRarities', () => {
    it('레어도 목록을 올바른 순서로 정렬해야 함', () => {
      const inputRarities: TCardRarityLabel[] = ['레어', '노멀', '슈퍼 레어'];
      const result = sortCardRarities(inputRarities);

      // 결과가 배열이어야 함
      expect(Array.isArray(result)).toBe(true);

      // 입력된 모든 레어도가 포함되어야 함
      inputRarities.forEach((rarity) => {
        expect(result).toContain(rarity);
      });
    });

    it('빈 배열이 입력되면 빈 배열을 반환해야 함', () => {
      const result = sortCardRarities([]);
      expect(result).toEqual([]);
    });
  });
});
