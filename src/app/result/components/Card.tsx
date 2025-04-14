import Image from 'next/image';

interface CardProps {
  children?: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="aspect-[2/3] bg-blue-500 rounded-lg p-1">
      <Image
        src="/images/tomori_card.png"
        alt="card"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full object-cover rounded-md"
      />
    </div>
  );
}
