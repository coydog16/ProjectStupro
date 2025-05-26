import { useState, useEffect } from 'react';
import DevMainInfo from './components/DevMainInfo';
import DevRouteInfo from './components/DevRouteInfo';

const DevHome = () => {
    const [count, setCount] = useState(0);
    const [apiStatus, setApiStatus] = useState<{
        status?: string;
        message?: string;
        error?: string;
        version?: string;
    }>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkApiHealth();
    }, []);

    const checkApiHealth = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/health');
            if (response.ok) {
                const data = await response.json();
                setApiStatus(data);
            } else {
                setApiStatus({
                    error: `エラー: ${response.status} ${response.statusText}`,
                });
            }
        } catch (error) {
            setApiStatus({
                error: `接続エラー: ${error instanceof Error ? error.message : String(error)}`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[url('/img/DarkLake.jpg')] bg-cover bg-center overflow-hidden">
            <div className="relative z-10 w-full max-w-4xl mx-auto p-6 rounded-[18px] shadow-xl bg-black/30 backdrop-blur-lg">
                <div className="flex flex-col md:flex-row gap-8 w-full">
                    <div className="flex-1 min-w-0">
                        <DevMainInfo
                            count={count}
                            setCount={setCount}
                            apiStatus={apiStatus}
                            loading={loading}
                            checkApiHealth={checkApiHealth}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <DevRouteInfo />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevHome;
