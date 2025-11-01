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

const cardRaritiesYugioh = [
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
    value: 'blue-secret',
    label: '블루 시크릿 레어',
  },
  {
    value: 'red-secret',
    label: '레드 시크릿 레어',
  },
  {
    value: 'rush-rare',
    label: '러시 레어',
  },
  {
    value: 'gold-rush-rare',
    label: '골드 러시 레어',
  },
  {
    value: 'over-rush-rare',
    label: '오버 러시 레어',
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

const cardRaritiesVanguard = [
  {
    value: 'PR',
    label: 'PR',
  },
  {
    value: 'SER',
    label: 'SER',
  },
  {
    value: 'GCR',
    label: 'GCR',
  },
  {
    value: 'CR',
    label: 'CR',
  },
  {
    value: 'SSP',
    label: 'SSP',
  },
  {
    value: 'RGR',
    label: 'RGR',
  },
  {
    value: 'SKR',
    label: 'SKR',
  },
  {
    value: 'MSR',
    label: 'MSR',
  },
  {
    value: 'TRR',
    label: 'TRR',
  },
  {
    value: 'EXRRR',
    label: 'EXRRR',
  },
  {
    value: 'EXC',
    label: 'EXC',
  },
  {
    value: 'EXS',
    label: 'EXS',
  },
  {
    value: 'EXP',
    label: 'EXP',
  },
  {
    value: 'EX',
    label: 'EX',
  },
  {
    value: 'Re+',
    label: 'Re+',
  },
  {
    value: 'Re',
    label: 'Re',
  },
  {
    value: 'LSP',
    label: 'LSP',
  },
  {
    value: 'LSR',
    label: 'LSR',
  },
  {
    value: 'SIR',
    label: 'SIR',
  },
  {
    value: 'SNR',
    label: 'SNR',
  },
  {
    value: 'SECP',
    label: 'SECP',
  },
  {
    value: 'SECV',
    label: 'SECV',
  },
  {
    value: 'SEC',
    label: 'SEC',
  },
  {
    value: 'SSR',
    label: 'SSR',
  },
  {
    value: 'WO',
    label: 'WO',
  },
  {
    value: 'DSR',
    label: 'DSR',
  },
  {
    value: 'SR',
    label: 'SR',
  },
  {
    value: 'SP',
    label: 'SP',
  },
  {
    value: 'FFR',
    label: 'FFR',
  },
  {
    value: 'ORRR',
    label: 'ORRR',
  },
  {
    value: 'RRR',
    label: 'RRR',
  },
  {
    value: 'ORR',
    label: 'ORR',
  },
  {
    value: 'RR',
    label: 'RR',
  },
  {
    value: 'FR',
    label: 'FR',
  },
  {
    value: 'SH',
    label: 'SH',
  },
  {
    value: 'H',
    label: 'H',
  },
  {
    value: 'R',
    label: 'R',
  },
  {
    value: 'TD',
    label: 'TD',
  },
  {
    value: 'C',
    label: 'C',
  },
] as const;

const cardRarities = {
  yugioh: cardRaritiesYugioh,
  vanguard: cardRaritiesVanguard,
};

export { cardLanguages, cardRarities };
