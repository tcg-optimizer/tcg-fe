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
} as const;

export { finalCartOptions };
