import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { Label } from './ui/label';

interface MobileCheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  children?: React.ReactNode;
}

const MobileCheckbox = ({
  id,
  children,
  checked,
  onCheckedChange,
}: MobileCheckboxProps) => {
  return (
    <>
      <Label
        className={cn(
          `flex items-center border text-gray-700 rounded-sm p-2 px-2 gap-2`,
          checked && 'text-blue-600 border-blue-600',
        )}
        htmlFor={id}
        onClick={(e) => e.stopPropagation()}
      >
        <CheckboxPrimitive.Root
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        >
          <Check className={cn('w-4 h-4', !checked && 'invisible')} />
        </CheckboxPrimitive.Root>
        {children}
      </Label>
    </>
  );
};

export default MobileCheckbox;
