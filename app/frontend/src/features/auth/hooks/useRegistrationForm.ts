import { useState } from 'react';
import apiClient from '../../../api/axios';
import { glassmorphicToast } from '../components/GlassmorphicToaster';

export function useRegistrationForm(accessToken: string | null) {
    const [registrationData, setRegistrationData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: '',
    });

    const handleRegistrationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegistrationData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegistrationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = accessToken || localStorage.getItem('access_token');
        if (!token) {
            glassmorphicToast('Please log in as admin before registering a new user.', { variant: 'error' });
            return;
        }
        try {
            await apiClient.post(
                '/auth/register',
                {
                    username: registrationData.username,
                    email: registrationData.email,
                    password: registrationData.password,
                    first_name: registrationData.first_name,
                    last_name: registrationData.last_name,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            glassmorphicToast('User registration successful!', { variant: 'success' });
        } catch (err: any) {
            if (err.response?.data?.details) {
                const details = err.response.data.details;
                if (details.missing_fields) {
                    glassmorphicToast(`Required fields: ${details.missing_fields.join(', ')}`, { variant: 'error' });
                }
                Object.entries(details).forEach(([field, msg]) => {
                    if (field !== 'missing_fields') {
                        glassmorphicToast(`${field}: ${msg}`, { variant: 'error' });
                    }
                });
            } else {
                glassmorphicToast(err.response?.data?.error || 'User registration failed', { variant: 'error' });
            }
        }
    };

    return {
        registrationData,
        setRegistrationData,
        handleRegistrationInputChange,
        handleRegistrationSubmit,
    };
}
