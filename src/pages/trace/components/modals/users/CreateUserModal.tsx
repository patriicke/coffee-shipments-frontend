import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { RegisterUserDTO, register_user } from '~/api/user';
import { ICONS } from '~/assets/icons';
import {
    Button,
    Form,
    InputField,
    ModalProps,
    SelectField,
} from '~/components/elements';
import { ClickEvent } from '~/core/hooks/useClickEvent';
import { countries } from '~/data';

const schema = z
    .object({
        name: z.string().min(1, 'Name is required'),
        username: z.string().min(1, 'Username is required'),
        country: z.string().min(1, 'Country Name is required'),
        region: z.string().min(1, 'Region is required'),
        address: z.string().min(1, 'Address is required'),
        role: z.string().min(1, 'Role is required'),
        password: z.string().min(1, 'Password is required'),
        confirm_password: z.string().min(1, 'Confirm Password is required'),
    })
    .refine(data => data.password === data.confirm_password, {
        message: 'Passwords don\'t match',
        path: ['confirm_password'],
    });

type SelectType = {
    value: string;
    label: string;
};

const selectable_countries: SelectType[] = countries.map(
    (country: { name: string; code: string }) => {
        return {
            value: country.name,
            label: country.name,
        };
    }
);

const selectable_roles: SelectType[] = [
    {
        value: 'producer',
        label: 'producer',
    },
    {
        value: 'supplier',
        label: 'supplier',
    },
    {
        value: 'distributor',
        label: 'distributor',
    },
];

export const CreateUserModal: React.FC<ModalProps> = props => {
    const { onClose } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (payload: RegisterUserDTO) => {
        try {
            setIsLoading(true);
            await register_user(payload);
            toast.success('User created successfully');
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
                        Add New User
                    </h1>
                    <button onClick={onClose}>
                        <img src={ICONS.Cancel} alt="Cancel Logo" />
                    </button>
                </div>
                <div className="overflow-auto py-3">
                    <Form<
                        RegisterUserDTO & { confirm_password: string },
                        typeof schema
                    >
                        schema={schema}
                        onSubmit={handleSubmit}
                    >
                        {({ register, formState }) => (
                            <>
                                <div className="flex flex-col gap-4">
                                    <InputField
                                        placeholder="Enter Your Names"
                                        error={formState.errors.name}
                                        registration={register('name')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        type="text"
                                    />
                                    <InputField
                                        placeholder="Enter Your Username"
                                        error={formState.errors.username}
                                        registration={register('username')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        type="text"
                                    />
                                    <SelectField
                                        options={selectable_countries}
                                        error={formState.errors.country}
                                        registration={register('country')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        placeholder={'Select Country'}
                                    />
                                    <InputField
                                        placeholder="Enter Your Region"
                                        error={formState.errors.region}
                                        registration={register('region')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        type="text"
                                    />
                                    <InputField
                                        placeholder="Enter Your Address"
                                        error={formState.errors.address}
                                        registration={register('address')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        type="text"
                                    />
                                    <SelectField
                                        options={selectable_roles}
                                        error={formState.errors.role}
                                        registration={register('role')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        placeholder={'Select Role'}
                                    />
                                    <InputField
                                        placeholder="Enter Your Password"
                                        error={formState.errors.password}
                                        registration={register('password')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        type="password"
                                    />
                                    <InputField
                                        placeholder="Confirm Your Password"
                                        error={
                                            formState.errors.confirm_password
                                        }
                                        registration={register(
                                            'confirm_password'
                                        )}
                                        className="h-12"
                                        isLoading={isLoading}
                                        type="password"
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
