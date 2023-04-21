import { RouteObject } from 'react-router-dom';
import LoginPage from '~/pages/auth/login/LoginPage';
import RegisterPage from '~/pages/auth/register/RegisterPage';

export const AuthRoutes: RouteObject[] = [
    {
        path: '',
        index: true,
        element: <LoginPage />,
    },
    {
        path: 'login',
        element: <LoginPage />,
    },
    {
        path: 'register',
        element: <RegisterPage />,
    },
];
