import { useRoutes } from 'react-router-dom';
import AdminPageLayout from '~/components/layouts/admin/AdminPageLayout';
import AppLayout from '~/components/layouts/app/AppLayout';
import AuthPageLayout from '~/components/layouts/auth/AuthPageLayout';
import NotFoundPage from '~/pages/notfound/NotFoundPage';
import { AdminRouteProtector } from '~/core/protector/admin/AdminProtector';
import HomePage from '~/pages/home/HomePage';
import { AuthRouteProtector } from '~/core/protector/auth/AuthProtector';
import { AdminRoutes } from './admin/AdminRoutes';
import { AuthRoutes } from './auth/AuthRoutes';

export const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                },
                {
                    path: 'auth',
                    element: (
                        <AuthRouteProtector element={<AuthPageLayout />} />
                    ),
                    children: AuthRoutes,
                },
                {
                    path: 'admin',
                    element: (
                        <AdminRouteProtector element={<AdminPageLayout />} />
                    ),
                    children: AdminRoutes,
                },
            ],
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ]);
};
