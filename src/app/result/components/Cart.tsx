import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SidebarContent from './SidebarContent';

export default function Cart() {
  return (
    <Card className="sticky top-20 h-[calc(50vh-32px-1rem)] w-64 mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle>장바구니</CardTitle>
      </CardHeader>

      <CardContent className="overflow-auto">
        <SidebarContent
          cardInfo={{
            cardId: 1,
            cardName: '우우우우 돌돌돌',
            cardCode: 'TMR-0102',
            price: 12000,
            image: '/images/tomori_card.png',
            cacheId: '1',
            cacheExpiredAt: '2025-01-01',
            id: 1,
            site: 'TCGShop',
            url: 'https://tcgshop.com/product/123',
            condition: '신품',
            rarity: '울트라 레어',
            language: '한글판',
            available: true,
            lastUpdated: '2025-01-01',
          }}
        />
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" variant={'primary'}>
          최저가 조합하기
        </Button>
      </CardFooter>
    </Card>
  );
}
