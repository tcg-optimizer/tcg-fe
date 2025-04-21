import { Skeleton } from '@/components/ui/skeleton';

export default function CardSkeleton() {
  return (
    <div>
      <div className="w-full flex h-[400px] gap-4">
        {/* 카드 이미지 스켈레톤 */}
        <div className="w-[280px] aspect-[2/3] rounded-md overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>

        {/* 카드 정보 스켈레톤 */}
        <div className="flex-1 flex flex-col gap-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-20 w-full mt-4" />
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-8 h-[1px] bg-gray-200 w-full" />

      {/* 가격 정보 스켈레톤 */}
      <div className="w-full mt-8">
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-4 w-60 mb-8" />

        <Skeleton className="h-10 w-full mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between mb-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-4 w-32 mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
