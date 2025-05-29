import DevHome from './features/dev/DevHome';
import LoginPage from './features/auth/pages/LoginPage';
import FeedPage from './features/feed/pages/FeedPage';
import AdminPage from './features/admins/pages/AdminPage';

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
        element: <AdminPage />,
        label: 'AdminDashboard',
    },
];

export default routes;
