import DevHome from './features/dev/DevHome';
import LoginPage from './features/auth/pages/LoginPage';
import FeedPage from './features/feed/pages/FeedPage';
import DashboardPage from './features/admins/pages/DashboardPage';

interface LabeledRoute {
    path: string;
    element: JSX.Element;
    label: string;
}

// ルート定義
const routes: LabeledRoute[] = [
    {
        path: '/',
        element: <DevHome />,
        label: 'DevHome',
    },
    {
        path: '/login',
        element: <LoginPage />,
        label: 'LoginPage',
    },
    {
        path: '/feed/',
        element: <FeedPage />,
        label: 'FeedPage',
    },
    {
        path: '/admin',
        element: <DashboardPage />,
        label: 'AdminDashboard',
    },
];

export default routes;
