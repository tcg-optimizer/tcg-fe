import { cardLanguages, cardRarities } from '@/data/card';
import { TCardLanguageLabel, TCardRarityLabel, TGameType } from '@/types/card';

const sortCardLanguages = (languages: TCardLanguageLabel[]) => {
  const availableLanguages = new Set(languages);
  return cardLanguages
    .map(({ label }) => label)
    .filter((label) => availableLanguages.has(label));
};

const sortCardRarities = (
  rarities: TCardRarityLabel[],
  gameType: TGameType,
) => {
  const availableRarities = new Set(rarities);
  return cardRarities[gameType]
    .map(({ label }) => label)
    .filter((label) => availableRarities.has(label));
};

export { sortCardLanguages, sortCardRarities };
