import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

export const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = parseISO(dateString);
  return format(date, 'yyyy/MM/dd', { locale: ja });
};

export const calculateDateAgo = (dateString: string) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { locale: ja }) + '前';
};
