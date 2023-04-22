import { AxiosErrorHandler, CustomError } from '~/core/libs';
import { PRIVATE_API } from '../axios';

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
