import { AxiosErrorHandler, CustomError } from '~/core/libs';
import { PRIVATE_API } from '../axios';
import { ShippingType } from '~/core/types/shippings';
import { PaginationType } from '~/core/types/pagination';
import { queryString } from '~/core/utils';

export type RegisterShipmentDTO = {
    origin: string;
    destination: string;
    quantity: number;
    status: string;
};

export const register_shipment = async (
    coffee_shipment_payload: RegisterShipmentDTO
): Promise<any> => {
    try {
        const request = await PRIVATE_API.post(
            '/coffee-shipments',
            coffee_shipment_payload
        );
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const get_all_shippings = async (
    query?: string
): Promise<PaginationType<ShippingType>> => {
    try {
        const request = await PRIVATE_API.get(
            `/coffee-shipments${queryString(query)}`
        );
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const update_shipment = async (
    shipment_id: string,
    shipment_payload: RegisterShipmentDTO
): Promise<ShippingType> => {
    try {
        const request = await PRIVATE_API.put(
            `/coffee-shipments/${shipment_id}`,
            shipment_payload
        );
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};
