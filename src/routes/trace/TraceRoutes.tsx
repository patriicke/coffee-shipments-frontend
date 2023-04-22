import { RouteObject } from 'react-router-dom';
import { TraceDashboardPage } from '~/pages/trace/dashboard/TraceDashboardPage';
import { TraceShippingsPage } from '~/pages/trace/shippings/TraceShippingsPage';
import { TraceUsersPage } from '~/pages/trace/users/TraceUsersPage';

export const TraceRoutes: RouteObject[] = [
    {
        path: '',
        index: true,
        element: <TraceDashboardPage />,
    },
    {
        path: 'users',
        index: true,
        element: <TraceUsersPage />,
    },
    {
        path: 'shippings',
        index: true,
        element: <TraceShippingsPage />,
    },
];
