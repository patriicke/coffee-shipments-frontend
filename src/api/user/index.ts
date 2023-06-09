import { AxiosErrorHandler, CustomError } from '~/core/libs';
import { UserType } from '~/core/types';
import { PaginationType } from '~/core/types/pagination';
import { queryString } from '~/core/utils';
import { PRIVATE_API } from '../axios';

type RegisterUserPayload = {
    access_token: string;
    user: UserType;
};

export type RegisterUserDTO = {
    name: string;
    username: string;
    password: string;
    country: string;
    region: string;
    address: string;
    role: string;
};

export const register_user = async (
    user_payload: RegisterUserDTO
): Promise<RegisterUserPayload> => {
    try {
        const request = await PRIVATE_API.post('/users/register', user_payload);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const get_all_users = async (
    query?: string
): Promise<PaginationType<UserType>> => {
    try {
        const request = await PRIVATE_API.get(`/users${queryString(query)}`);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const delete_user = async (user_id: string) => {
    try {
        const request = await PRIVATE_API.delete(`/users/${user_id}`);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const update_user = async (
    user_id: string,
    user_payload: RegisterUserDTO
): Promise<UserType> => {
    try {
        const request = await PRIVATE_API.put(
            `/users/${user_id}`,
            user_payload
        );
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const get_user = async (user_id: string): Promise<UserType> => {
    try {
        const request = await PRIVATE_API.get(`/users/${user_id}`);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};
