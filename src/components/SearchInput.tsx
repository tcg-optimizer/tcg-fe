import { SearchIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { ChangeEvent } from 'react';

interface SearchInputProps {
  keyword?: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  keyword = '검색어를 입력해주세요.',
  className,
  value,
  onChange,
}: SearchInputProps) {
  const placeholder = keyword || '검색어를 입력해주세요.';

  return (
    <div className="flex justify-center items-center gap-2">
      <Input
        className={cn('w-full', className)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Button type="submit">
        <SearchIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
