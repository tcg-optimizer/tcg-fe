import { X } from 'lucide-react';
import { Badge } from './ui/badge';

interface DeletableBadgeButtonProps {
  content: string;
  onClick: () => void;
  onDelete: () => void;
}

const DeletableBadgeButton = ({
  content,
  onClick,
  onDelete,
}: DeletableBadgeButtonProps) => {
  return (
    <Badge
      className="flex items-center text-gray-500 cursor-pointer"
      variant="outline"
      onClick={onClick}
    >
      {content}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-gray-500 hover:text-gray-700 cursor-pointer"
        aria-label="삭제"
      >
        <X size={14} />
      </button>
    </Badge>
  );
};

export default DeletableBadgeButton;
