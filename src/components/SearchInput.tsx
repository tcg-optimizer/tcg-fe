import { SearchIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import GameTypeSelector from '@/app/search/components/GameTypeSelector';
import { useState } from 'react';
import { TGameType } from '@/types/card';

interface SearchInputProps {
  keyword?: string;
  className?: string;
  onSubmit: (searchTerm: string, gameType: TGameType) => void;
}

export default function SearchInput({
  keyword = '검색어를 입력해주세요.',
  className,
  onSubmit,
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [gameType, setGameType] = useState<TGameType>('yugioh');
  const placeholder = keyword || '검색어를 입력해주세요.';

  const handleSubmit = () => {
    onSubmit(searchTerm, gameType);
  };

  return (
    <div className="w-full flex justify-center items-center gap-2">
      <GameTypeSelector gameType={gameType} onGameTypeChange={setGameType} />
      <Input
        className={cn('w-full', className)}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <Button type="submit" onClick={handleSubmit}>
        <SearchIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
