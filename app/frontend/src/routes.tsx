import { RouteObject } from "react-router-dom";
import LoginPageTailwind from "./features/auth/pages/LoginPageTailwind";
import RegisterPageTailwind from "./features/auth/pages/RegisterPageTailwind";

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
    {
        path: "/register",
        element: <RegisterPageTailwind />,
    },
];

export default routes;
