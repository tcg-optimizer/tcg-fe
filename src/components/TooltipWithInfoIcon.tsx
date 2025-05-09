import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { cn } from '@/lib/utils';

interface TooltipWithInfoIconProps {
  message: string;
  className?: string;
}

const TooltipWithInfoIcon = ({
  message,
  className,
}: TooltipWithInfoIconProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={cn('flex-shrink-0', className)} asChild>
          <Info className="w-4 h-4" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="whitespace-pre-wrap">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWithInfoIcon;
