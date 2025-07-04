import { useState } from 'react';
import apiClient from '../../../api/axios';
import { glassmorphicToast } from '../components/GlassmorphicToaster';
import { useNavigate } from 'react-router-dom';

export function useLoginForm() {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await apiClient.post('/auth/login', {
                username: loginData.username,
                password: loginData.password,
            });
            const user = res.data.user;
            glassmorphicToast('Login successful!', { variant: 'success' });
            localStorage.setItem('access_token', res.data.access_token);
            if (user && user.id) {
                localStorage.setItem('user_id', String(user.id));
            }
            navigate(`/feed/${user.username}`); // または `/feed/${user.username}`
        } catch (err: any) {
            glassmorphicToast(err.response?.data?.error || 'Login failed', {
                variant: 'error',
            });
        }
    };

    return {
        loginData,
        setLoginData,
        handleLoginInputChange,
        handleLoginSubmit,
        accessToken,
        setAccessToken,
    };
}
