import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { who_am_i } from '~/api/auth';
import { storage } from '~/core/utils';
import { adduserRedux } from '../redux/slices/userSlice';
import { useLogout } from './useLogout';

export const CheckUser = () => {
    const token = storage.getToken();
    const dispatch = useDispatch();
    const { logout } = useLogout();

    const fetchUser = async () => {
        if (token) {
            try {
                const user = await who_am_i();
                dispatch(adduserRedux(user));
            } catch (error) {
                logout();
            }
        }

        if (!token) {
            localStorage.clear();
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
};
