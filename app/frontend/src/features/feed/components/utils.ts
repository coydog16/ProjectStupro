// ユーザー名表示用ユーティリティ
import { UserType } from '../../../types';
export type { FeedFilterType } from './FeedList';
export { filterAllFeed, filterSelfFeed } from './FeedList';

export const isJapanese = (str: string) => /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9faf]/.test(str);

export const getDisplayName = (user?: UserType) => {
    if (!user) return '匿名ユーザー';
    const first = user.first_name || '';
    const last = user.last_name || '';
    if (isJapanese(first + last)) {
        // 日本語が含まれていればラストネーム→ファーストネーム
        return `${last}${first}`.trim();
    } else {
        // アルファベットのみならファーストネーム→ラストネーム
        return `${first} ${last}`.trim();
    }
};
