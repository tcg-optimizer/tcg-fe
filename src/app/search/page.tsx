import { Checkbox } from '@/components/ui/checkbox';
import SearchInput from '@/components/SearchInput';

export default function Search() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <SearchInput />
        <div className="w-full flex justify-end items-center-safe space-x-2">
          <Checkbox id="check-used" />
          <label
            htmlFor="check-used"
            className="text-sm font-medium leading-tone peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            중고 상품을 포함합니다
          </label>
        </div>
      </div>
    </div>
  );
}
