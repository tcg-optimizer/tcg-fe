import { Suspense } from 'react';
import CardSkeleton from './components/CardSkeleton';
import CardResult from './components/CardResult';

// 서버 컴포넌트에서는 searchParams를 props로 받습니다
export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cardName = (await searchParams).cardName as string;
  const includeUsed = (await searchParams).used === 'true';

  if (!cardName) {
    return (
      <div className="w-full flex justify-center items-center h-[400px]">
        카드 이름이 제공되지 않았습니다.
      </div>
    );
  }

  return (
    <Suspense key={cardName} fallback={<CardSkeleton />}>
      <CardResult
        key={cardName}
        cardName={cardName}
        includeUsed={includeUsed}
      />
    </Suspense>
  );
}
