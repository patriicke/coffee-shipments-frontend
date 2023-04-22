import { ModelType } from '../model';

export type UserType = ModelType & {
    name: string;
    username: string;
    country: string;
    region: string;
    address: string;
    role: string;
};
