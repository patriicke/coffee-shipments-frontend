import { useDispatch } from 'react-redux';
import { removeUserRedux } from '../redux/slices/userSlice';

export const useLogout = () => {
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.clear();
        dispatch(removeUserRedux());
        window.location.reload();
    };

    return { logout };
};
