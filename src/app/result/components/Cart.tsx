'use client';

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
import { useCartStore } from '@/store/cartStore';
import { Fragment } from 'react';

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
            <SidebarContent cardInfo={item} />
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
