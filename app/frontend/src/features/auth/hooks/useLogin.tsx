import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../api/axios';
import { glassmorphicToast } from '../components/GlassmorphicToaster';

/**
 * ログインフォームの状態とロジックをまとめたカスタムフック
 */
export function useLogin() {
    // ユーザー名・パスワードの入力状態
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
    });
    // JWTトークン
    const [token, setToken] = useState<string | null>(null);
    // 画面遷移用
    const navigate = useNavigate();

    /**
     * 入力欄の変更ハンドラ
     */
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * フォーム送信時のログイン処理
     */
    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await apiClient.post('/auth/login', {
                username: loginInfo.username,
                password: loginInfo.password,
            });
            const accessToken = res.data.access_token;
            setToken(accessToken);
            localStorage.setItem('access_token', accessToken);
            glassmorphicToast('ログイン成功！', { variant: 'success' });
            navigate('/feed');
        } catch (err: any) {
            glassmorphicToast(err.response?.data?.error || 'ログインに失敗しました', {
                variant: 'error',
            });
        }
    };

    return {
        loginInfo,
        setLoginInfo,
        token,
        setToken,
        onInputChange,
        onLogin,
    };
}
