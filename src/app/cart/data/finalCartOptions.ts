const finalCartOptions = {
  shippingRegion: [
    {
      id: 'jeju',
      label: '제주',
    },
    {
      id: 'island',
      label: '도서',
    },
  ],
  discounts: [
    {
      id: 'tcgshopPoints',
      label: 'TCGShop 적립금',
      description: '티씨지샵 적립금(10%)을 고려해서 최저가 조합 계산을 합니다.',
    },
    {
      id: 'carddcPoints',
      label: 'CardDC 적립금',
      description: '카드디씨 적립금(10%)을 고려해서 최저가 조합 계산을 합니다.',
    },
    {
      id: 'naverBasicPoints',
      label: '네이버 적립금',
      description:
        '네이버페이 기본 적립금(2.5%)과 네이버 리뷰 적립금(3000원 이상 제품당 150원)을 고려해서 최저가 조합 계산을 합니다.',
    },
    {
      id: 'naverMembershipPoints',
      label: '네이버 멤버십 적립금',
      description:
        '네이버 멤버십 적립금(4%)을 고려해서 최저가 조합 계산을 합니다.',
    },
    {
      id: 'naverBankbookPoints',
      label: '네이버 제휴통장 적립금',
      description:
        '네이버 제휴통장(네이버페이 머니 하나통장, 미래에셋증권 CMA-RP 네이버통장) 적립금(0.5%)을 고려해서 최저가 조합 계산을 합니다.',
    },
    {
      id: 'naverHyundaiCardPoints',
      label: '네이버 현대카드 적립금',
      description:
        '네이버 현대카드 적립금(7%)을 고려해서 최저가 조합 계산을 합니다.',
    },
  ],
  takeout: [
    { id: 'cardKingdom', label: '장한평 카드킹덤', price: 100 },
    { id: 'cardNyang', label: '역삼 카드냥', price: 100 },
    { id: 'cardSquare', label: '신당 카드스퀘어', price: 100 },
    { id: 'minCGCardMarket', label: '대전 민씨지샵', price: 0 },
    { id: 'diMarket', label: '전주 디마켓', price: 100 },
    { id: 'skyscraper', label: '역곡 마천루 카드장터', price: 100 },
    { id: 'areaZeroStore', label: '석계 에리어제로 스토어', price: 100 },
    { id: 'blackStone', label: '흑석 블랙스톤', price: 100 },
    { id: 'dualWinner', label: '대화 듀얼위너', price: 100 },
    { id: 'tcgKingdom', label: '울산 TCG킹덤', price: 10 },
    { id: 'tcgPlayer', label: '광주 티씨지 플레이어', price: 0 },
    { id: 'tcgCardFreedom', label: '청주 TCG 카드프리덤', price: 0 },
  ],
} as const;

type TTakeout = (typeof finalCartOptions.takeout)[number]['id'];
type TDiscount = (typeof finalCartOptions.discounts)[number]['id'];

export { finalCartOptions };
export type { TTakeout, TDiscount };
