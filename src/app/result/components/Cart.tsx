import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SidebarContent from './SidebarContent';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function Cart() {
  return (
    <Card className="xl:sticky top-20 h-[calc(50vh-32px-1.5rem)] w-64 overflow-hidden">
      <CardHeader>
        <CardTitle>장바구니</CardTitle>
      </CardHeader>

      <CardContent className="overflow-auto flex flex-col">
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
            quantity: 1,
            used: false,
          }}
        />
        <Separator className="mb-4" />
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
            quantity: 1,
            used: false,
          }}
        />
      </CardContent>
      <CardFooter className="mt-auto">
        <Link className="w-full" href="/cart">
          <Button className="w-full" variant={'primary'}>
            최저가 조합하기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
