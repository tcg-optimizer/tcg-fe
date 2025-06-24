'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { CartItem, useCartStore } from '@/store/cartStore';
import { Fragment } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function Cart() {
  const { items } = useCartStore();

  return (
    <Card className="xl:sticky top-20 h-[calc(50vh-32px-1.5rem)] xl:h-[calc(100vh-64px-2rem)] w-64 overflow-hidden">
      <CardHeader>
        <CardTitle>장바구니 ({items.length} 항목)</CardTitle>
      </CardHeader>

      <CardContent className="overflow-auto flex flex-col">
        {items.map((item, i) => (
          <Fragment key={item.id}>
            <CardComponent cardInfo={item} />
            {i !== items.length - 1 && <Separator className="my-4" />}
          </Fragment>
        ))}
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

interface CardComponentProps {
  cardInfo: CartItem;
}

const CardComponent = ({ cardInfo }: CardComponentProps) => {
  const { name, rarity, language, quantity, image, illustType } = cardInfo;

  return (
    <div className="flex flex-col gap-2 group relative">
      <div className="flex gap-2">
        <div className={`relative aspect-[2/3] w-16 rounded-md flex-shrink-0`}>
          <Image
            className="object-cover"
            src={image}
            alt="card"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold grow">
            {name} <span className="text-gray-500 text-sm">x {quantity}장</span>
          </p>
          {illustType !== 'default' && (
            <Badge className="mt-2">{'어나더 일러스트'}</Badge>
          )}
          <Badge variant="outline" className="mt-2">
            {rarity}
          </Badge>
          <Badge variant="outline" className="mt-2">
            {language}
          </Badge>
        </div>
      </div>
    </div>
  );
};
