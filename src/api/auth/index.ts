import { UserType } from '~/core/types';
import { PRIVATE_API } from '../axios';
import { AxiosErrorHandler, CustomError } from '~/core/libs';

export type LoginUserPayload = {
    access_token: string;
    user: UserType;
};

export type LoginUserDTO = {
    username: string;
    password: string;
};

export const login_user = async (
    userCredentials: LoginUserDTO
): Promise<LoginUserPayload> => {
    try {
        const request = await PRIVATE_API.post('/users/login', userCredentials);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const who_am_i = async () => {
    try {
        const request = await PRIVATE_API.get('/user/whoami');
        return request.data;
    } catch (error) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};
