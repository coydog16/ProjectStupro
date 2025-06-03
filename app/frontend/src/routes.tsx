import DevHome from './features/dev/DevHome';
import LoginPage from './features/auth/pages/LoginPage';
import FeedPage from './features/feed/pages/FeedPage';
import AdminPage from './features/admins/pages/AdminPage';
import UsersPage from './features/users/UsersPage';

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
        path: '/admin/:username',
        element: <AdminPage />,
        label: 'AdminDashboard',
    },
    {
        path: '/users/:username',
        element: <UsersPage />,
        label: 'UsersPage',
    },
];

export default routes;
