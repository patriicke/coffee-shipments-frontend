import { Navigate } from 'react-router-dom';
import { storage } from '~/core/utils';
import { ProtectorPropsType } from '../types';

export const TraceRouteProtector = (props: ProtectorPropsType): JSX.Element => {
    const { element } = props;

    const token = storage.getToken();

    if (!token) return <Navigate to={'/auth'} />;

    return element;
};
