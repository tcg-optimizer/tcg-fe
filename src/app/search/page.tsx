import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Input className="min-w-[400px]" placeholder="카드 이름을 입력해주세요" />
          <Button>
            <SearchIcon className="w-4 h-4" />
          </Button>
        </div>
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
