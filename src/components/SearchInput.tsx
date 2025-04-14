import { SearchIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  keyword?: string;
  className?: string;
}

export default function SearchInput({
  keyword = '검색어를 입력해주세요.',
  className,
}: SearchInputProps) {
  const placeholder = keyword || '검색어를 입력해주세요.';

  return (
    <div className="w-full flex justify-center items-center gap-2">
      <Input className={cn(className, 'w-[400px]')} placeholder={placeholder} />
      <Button>
        <SearchIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
