import { useEffect, useState } from 'react';
import { UserType } from '../types';
import apiClient from '../api/axios';

export function useUserByUsername(username?: string) {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) return;
        setLoading(true);
        apiClient.get(`/users/${username}`)
            .then(res => setUser(res.data))
            .catch(() => setError('ユーザー情報の取得に失敗しました'))
            .finally(() => setLoading(false));
    }, [username]);

    return { user, loading, error };
}
