import { RouteObject } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import FeedPage from "./features/feed/pages/FeedPage";
import DevHome from "./features/dev/DevHome";

// ルート定義
const routes: RouteObject[] = [
    {
        path: "/",
        element: <DevHome />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/feed",
        element: <FeedPage />,
    },
];

export default routes;
