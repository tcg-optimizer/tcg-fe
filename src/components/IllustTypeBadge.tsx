import { TIllustType } from '@/types/card';
import { Badge } from './ui/badge';

interface IllustTypeBadgeProps {
  illustType: TIllustType;
  className?: string;
}

const IllustTypeBadge = ({ illustType, className }: IllustTypeBadgeProps) => {
  if (illustType === 'default') {
    return null;
  }

  return <Badge className={className}>어나더 일러스트</Badge>;
};

export default IllustTypeBadge;
