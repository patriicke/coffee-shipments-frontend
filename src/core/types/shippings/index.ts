import { ModelType } from '../model';

export type ShippingType = ModelType & {
    origin: string;
    destination: string;
    quantity: number;
    status: string;
};
