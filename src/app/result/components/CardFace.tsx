'use client';

import { cn } from '@/lib/utils';
import { useResultStore } from '@/store/resultStore';
import Image from 'next/image';

interface CardFaceProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CardFace({ src, alt, className }: CardFaceProps) {
  const { selectedCardShopsInfo } = useResultStore();
  const selectedImage = selectedCardShopsInfo?.image;

  const srcImage = (selectedImage || src) === '' ? null : selectedImage || src;

  return (
    <div
      className={cn(
        className,
        'mx-auto aspect-[2/3] w-max h-[400px] sm:h-full rounded-lg border-4 box-content',
      )}
    >
      <Image
        src={srcImage!}
        alt={alt || ''}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full object-cover rounded-md"
      />
    </div>
  );
}
