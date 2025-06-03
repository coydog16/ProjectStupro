import { useEffect, useState } from 'react';
import { UserType } from '../types';
import apiClient from '../api/axios';

export function useAuth() {
    const [user, setUser] = useState<UserType | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 認証済みユーザー情報を取得するAPI（例: /api/auth/me）
        apiClient.get('/auth/me')
            .then(res => {
                setUser(res.data.user); // userオブジェクトをセット
                setIsAdmin(res.data.user?.role === 'admin'); // user.roleで判定
            })
            .catch(() => {
                setUser(null);
                setIsAdmin(false);
            })
            .finally(() => setLoading(false));
    }, []);

    return { user, isAdmin, loading };
}
