import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { RegisterShipmentDTO, register_shipment } from '~/api/ship';
import { ICONS } from '~/assets/icons';
import {
    Button,
    Form,
    InputField,
    ModalProps,
    SelectField,
} from '~/components/elements';
import { ClickEvent } from '~/core/hooks/useClickEvent';

const schema = z.object({
    origin: z.string().min(1, 'Origin is required'),
    destination: z.string().min(1, 'Destination is required'),
    quantity: z.string().min(1, 'Quantity is required'),
    status: z.string().min(1, 'Status is required'),
});

type SelectType = {
    value: string;
    label: string;
};

const selectable_status: SelectType[] = [
    {
        value: 'active',
        label: 'active',
    },
    {
        value: 'inactive',
        label: 'inactive',
    },
];

export const CreateShippingModal: React.FC<ModalProps> = props => {
    const { onClose } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (payload: RegisterShipmentDTO) => {
        try {
            setIsLoading(true);
            await register_shipment(payload);
            toast.success('Shipment created successfully');
            onClose();
        } catch (error: any) {
            toast.error(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };
    const ELEMENT: any = useRef();

    ClickEvent(ELEMENT, onClose);

    return (
        <div className="flex h-full w-full justify-end rounded-md p-2">
            <div
                className="flex h-full w-full max-w-[32em] flex-col gap-3 bg-white p-7 md:w-2/4 xl:w-2/5"
                ref={ELEMENT}
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-primary-500">
                        Add New Shippment
                    </h1>
                    <button onClick={onClose}>
                        <img src={ICONS.Cancel} alt="Cancel Logo" />
                    </button>
                </div>
                <div className="overflow-auto py-3">
                    <Form<RegisterShipmentDTO, typeof schema>
                        schema={schema}
                        onSubmit={handleSubmit}
                    >
                        {({ register, formState }) => (
                            <>
                                <div className="flex flex-col gap-4">
                                    <InputField
                                        placeholder="Enter Your Origin"
                                        error={formState.errors.origin}
                                        registration={register('origin')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        type="text"
                                    />
                                    <InputField
                                        placeholder="Enter Destination"
                                        error={formState.errors.destination}
                                        registration={register('destination')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        type="text"
                                    />
                                    <InputField
                                        placeholder="Enter Quantity"
                                        error={formState.errors.quantity}
                                        registration={register('quantity')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        type="text"
                                    />
                                    <SelectField
                                        placeholder="Select Status"
                                        error={formState.errors.status}
                                        registration={register('status')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        options={selectable_status}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="bg-primary-500"
                                    className="text-md mt-4 w-full font-semibold"
                                    isLoading={isLoading}
                                >
                                    CREATE
                                </Button>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
};
