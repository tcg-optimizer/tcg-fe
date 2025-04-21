import Image from 'next/image';

export default function FinalHistory() {
  return (
    <div>
      <h1 className="text-2xl font-bold mt-8">검색 기록</h1>
      <div className="flex gap-4 mt-8">
        <div className="flex flex-col gap-2 rounded-md p-4 bg-gray-100 max-w-32 cursor-pointer">
          <div className="w-24 aspect-[2/3] rounded-md overflow-hidden">
            <Image
              src="/images/tomori_card.png"
              alt="card"
              width={500}
              height={500}
            />
          </div>
          <p className="text-sm break-keep break-words">
            <b>대모리</b>
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-md p-4 bg-gray-100 max-w-32 cursor-pointer">
          <div className="w-24 aspect-[2/3] rounded-md overflow-hidden">
            <Image
              src="/images/tomori_card.png"
              alt="card"
              width={500}
              height={500}
            />
          </div>
          <p className="text-sm break-keep break-words">
            <b>대모리</b>
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-md p-4 bg-gray-100 max-w-32 cursor-pointer">
          <div className="w-24 aspect-[2/3] rounded-md overflow-hidden">
            <Image
              src="/images/tomori_card.png"
              alt="card"
              width={500}
              height={500}
            />
          </div>
          <p className="text-sm break-keep break-words">
            <b>대모리</b>
          </p>
        </div>
      </div>
    </div>
  );
}
