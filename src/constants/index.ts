import { pagesPath } from '@/libs/$path';

export const SERVICE_LOGO = 'https://placehold.jp/200x200.png' as const;

export const PAGE_PATH_AND_NAME = [{ name: 'Top', href: pagesPath.$url().pathname }] as const;

export const EMPTY_THUMBNAIL_URL = 'https://placehold.jp/300x200.png' as const;
