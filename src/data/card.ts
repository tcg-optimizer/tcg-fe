const cardLanguages = [
  {
    value: 'korean',
    label: '한글판',
  },
  {
    value: 'japanese',
    label: '일본판',
  },
  {
    value: 'english',
    label: '영문판',
  },
] as const;

const cardRarities = [
  {
    value: 'normal',
    label: '노멀',
  },
  {
    value: 'rare',
    label: '레어',
  },
  {
    value: 'parallel',
    label: '패러렐 레어',
  },
  {
    value: 'gold',
    label: '골드 레어',
  },
  {
    value: 'gold-secret',
    label: '골드 시크릿 레어',
  },
  {
    value: 'premium',
    label: '프리미엄 골드 레어',
  },
  {
    value: 'super',
    label: '슈퍼 레어',
  },
  {
    value: 'ultra',
    label: '울트라 레어',
  },
  {
    value: 'ultimate',
    label: '얼티미트 레어',
  },
  {
    value: 'collectors',
    label: '컬렉터즈 레어',
  },
  {
    value: 'millennium',
    label: '밀레니엄 레어',
  },
  {
    value: 'secret',
    label: '시크릿 레어',
  },
  {
    value: 'holo',
    label: '홀로그래픽 레어',
  },
  {
    value: 'extra',
    label: '엑스트라 시크릿 레어',
  },
  {
    value: 'prism',
    label: '프리즈마틱 시크릿 레어',
  },
  {
    value: '20th',
    label: '20th 시크릿 레어',
  },
  {
    value: 'quarter',
    label: '쿼터 센츄리 시크릿 레어',
  },
] as const;

export { cardLanguages, cardRarities };
