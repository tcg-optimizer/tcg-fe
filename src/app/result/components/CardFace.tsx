import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CardFaceProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CardFace({ src, alt, className }: CardFaceProps) {
  return (
    <div
      className={cn(
        'aspect-[2/3] rounded-lg border-4 box-content border-blue-500',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full object-cover rounded-md"
      />
    </div>
  );
}
