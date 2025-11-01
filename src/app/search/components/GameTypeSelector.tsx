import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { TCardSource } from '@/types/card';

const gameTypes: { value: TCardSource; label: string }[] = [
  { value: 'yugioh', label: '유희왕' },
  { value: 'vanguard', label: '뱅가드' },
];

interface GameTypeSelectorProps {
  gameType: TCardSource;
  onGameTypeChange: (value: TCardSource) => void;
}

const GameTypeSelector = ({
  gameType,
  onGameTypeChange,
}: GameTypeSelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Select value={gameType} onValueChange={onGameTypeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="게임 선택" />
        </SelectTrigger>
        <SelectContent>
          {gameTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GameTypeSelector;
