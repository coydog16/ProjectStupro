import { RouteObject } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";

// ルート定義
const routes: RouteObject[] = [
    {
        path: "/",
        element: <div>nav</div>,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
];

export default routes;
