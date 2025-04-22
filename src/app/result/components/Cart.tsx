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
    <Card className="xl:sticky top-20 h-[calc(50vh-32px-1.5rem)] w-64 overflow-hidden">
      <CardHeader>
        <CardTitle>장바구니</CardTitle>
      </CardHeader>

      <CardContent className="overflow-auto flex flex-col">
        {items.map((item, i) => (
          <Fragment key={item.id}>
            <CardComponent cardInfo={item} />
            {i !== items.length - 1 && <Separator className="mb-4" />}
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
  const { name, condition, rarity, language, quantity, image } = cardInfo;

  return (
    <div className="flex flex-col gap-2 group relative">
      <div className="flex gap-2">
        <div className={`aspect-[2/3] w-16 rounded-md`}>
          <Image
            className="w-full h-full object-cover"
            src={image}
            alt="card"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold grow">{name}</p>
          <p className="text-sm text-gray-500 mb-2">
            {/* {price}원 *  */}
            <b>{quantity}장</b>
          </p>
        </div>
      </div>
      <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-20 group-hover:mb-4">
        <div className="flex gap-2 flex-wrap mt-2">
          <Badge variant="outline">{condition}</Badge>
          <Badge variant="outline">{rarity}</Badge>
          <Badge variant="outline">{language}</Badge>
        </div>
      </div>
    </div>
  );
};
