'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  SearchHistoryItem,
  useSearchHistoryStore,
} from '@/store/searchHistoryStore';
import Image from 'next/image';
import { Fragment } from 'react';

export default function History() {
  const { history } = useSearchHistoryStore();

  return (
    <Card className="xl:sticky top-20 h-[calc(50vh-32px-1.5rem)] w-64 overflow-auto">
      <CardHeader>
        <CardTitle>검색 기록</CardTitle>
      </CardHeader>

      <CardContent className="overflow-auto flex flex-col">
        {history.map((historyInfo, i) => (
          <Fragment key={historyInfo.query}>
            <HistoryComponent historyInfo={historyInfo} />
            {i !== history.length - 1 && <Separator className="my-4" />}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}

interface HistoryComponentProps {
  historyInfo: SearchHistoryItem;
}

const HistoryComponent = ({ historyInfo }: HistoryComponentProps) => {
  const { cardName, cardImage } = historyInfo;

  return (
    <div className="flex flex-col gap-2 group relative">
      <div className="flex gap-2">
        <div className={`aspect-[2/3] w-16 rounded-md`}>
          <Image
            className="w-full h-full object-cover"
            src={cardImage}
            alt="card"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold grow">{cardName}</p>
        </div>
      </div>
    </div>
  );
};
