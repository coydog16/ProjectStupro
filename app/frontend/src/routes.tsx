import { RouteObject } from "react-router-dom";
import LoginPageTailwind from "./features/auth/pages/LoginPageTailwind";

// ルート定義
const routes: RouteObject[] = [
    {
        path: "/",
        element: <div>nav</div>,
    },
    {
        path: "/login",
        element: <LoginPageTailwind />,
    },
];

export default routes;
