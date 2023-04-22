import { useRoutes } from 'react-router-dom';
import AppLayout from '~/components/layouts/app/AppLayout';
import AuthPageLayout from '~/components/layouts/auth/AuthPageLayout';
import NotFoundPage from '~/pages/notfound/NotFoundPage';
import HomePage from '~/pages/home/HomePage';
import { AuthRouteProtector } from '~/core/protector/auth/AuthProtector';
import { AuthRoutes } from './auth/AuthRoutes';
import { TracePageLayout } from '~/components/layouts/trace/TracePageLayout';
import { TraceRouteProtector } from '~/core/protector/trace/TraceProtector';
import { TraceRoutes } from './trace/TraceRoutes';
import { HomeRouteProtector } from '~/core/protector/home/HomeProtector';

export const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    path: '/',
                    element: <HomeRouteProtector element={<HomePage />} />,
                },
                {
                    path: 'auth',
                    element: (
                        <AuthRouteProtector element={<AuthPageLayout />} />
                    ),
                    children: AuthRoutes,
                },
                {
                    path: 'trace',
                    element: (
                        <TraceRouteProtector element={<TracePageLayout />} />
                    ),
                    children: TraceRoutes,
                },
                {
                    path: '*',
                    element: <NotFoundPage />,
                },
            ],
        },
    ]);
};
