import { CardRarityPriceInfo } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Shop from './Shop';
import { TCardLanguageLabel, TCardRarityLabel } from '@/types/card';

interface MarketPriceProps {
  rarityPrices: {
    [language: string]: {
      [rarity: string]: CardRarityPriceInfo;
    };
  };
  includeUsed: boolean;
}

export default function MarketPrice({
  rarityPrices,
  includeUsed,
}: MarketPriceProps) {
  // 사용 가능한 언어 목록
  const languages = Object.keys(rarityPrices);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div>
          <h1 className="text-2xl font-bold">가격 정보</h1>
          <p className="text-gray-500 text-sm">
            *언어와 레어도를 선택하여 가격을 확인하세요.
          </p>
        </div>
      </div>

      {languages.length > 0 ? (
        <Tabs defaultValue={languages[0]}>
          <TabsList className="mb-4">
            {languages.map((language) => (
              <TabsTrigger key={language} value={language}>
                {language}
              </TabsTrigger>
            ))}
          </TabsList>

          {languages.map((language) => (
            <TabsContent key={language} value={language}>
              {Object.entries(rarityPrices[language]).map(
                ([rarity, rarityInfo]) => (
                  <div key={rarity} className="mb-8">
                    <div className="flex gap-4 items-start mb-4">
                      {rarityInfo.image && (
                        <div className="w-24 h-36 rounded-md overflow-hidden">
                          <img
                            src={rarityInfo.image}
                            alt={`${rarity} 카드 이미지`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h2 className="text-xl font-semibold">{rarity}</h2>
                        <p className="text-gray-500">
                          {rarityInfo.prices.length}개의 가격 정보가 있습니다.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rarityInfo.prices
                        .filter(
                          (price) => includeUsed || price.condition === '신품',
                        )
                        .map((price) => (
                          <Shop
                            key={price.id}
                            shopInfo={{
                              id: price.id,
                              price: price.price,
                              site: price.site,
                              url: price.url,
                              condition: price.condition,
                              rarity: price.rarity as TCardRarityLabel,
                              language: price.language as TCardLanguageLabel,
                              cardCode: price.cardCode,
                              available: price.available,
                              lastUpdated: price.lastUpdated,
                              used: price.condition !== '신품',
                            }}
                          />
                        ))}
                    </div>
                  </div>
                ),
              )}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="text-center py-8 text-gray-500">
          가격 정보가 없습니다.
        </div>
      )}
    </div>
  );
}
