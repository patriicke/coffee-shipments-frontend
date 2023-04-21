import { ModelType } from '../model';

export type UserType = ModelType & {
    name: string;
    username: string;
    country: string;
    region: string;
    address: string;
    role: string;
};

export type CreateUserPayloadType = {
    email: string;
    fullname: string;
    username: string;
    password: string;
    profile_image?: string;
};
