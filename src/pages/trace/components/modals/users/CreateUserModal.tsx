import React, { useState } from 'react';
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

const schema = z
    .object({
        role: z.string().min(1, 'Role is required'),
        name: z.string().min(1, 'Name is required'),
        email: z.string().min(1, 'Email is required').email(),
        username: z.string().min(1, 'Username is required'),
        phoneNumber: z.string().min(1, 'Phone number is required'),
        password: z.string().min(1, 'Password is required'),
        confirm_password: z.string().min(1, 'Confirm Password is required'),
    })
    .refine(data => data.password === data.confirm_password, {
        message: 'Passwords don\'t match',
        path: ['confirm_password'],
    });

export const UserRolesOptions: {
    label: string;
    value: string;
}[] = [
    {
        label: 'Admin',
        value: 'admin',
    },
    {
        label: 'Technician',
        value: 'technician',
    },
    {
        label: 'Stock Manager',
        value: 'stock_manager',
    },
    {
        label: 'Logistic Manager',
        value: 'logistic_manager',
    },
    {
        label: 'Management',
        value: 'management',
    },
];

const CreateUserModal: React.FC<ModalProps> = props => {
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

    return (
        <div className="flex h-full w-full justify-end rounded-md p-2">
            <div className="flex h-full w-full max-w-[32em] flex-col gap-3 bg-white p-7 md:w-2/4 xl:w-2/5">
                <div className="flex items-center  justify-between">
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
                                        placeholder="Ex: Junior Rurangwa"
                                        error={formState.errors.name}
                                        registration={register('name')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        label={'Name'}
                                        type="text"
                                    />
                                    <InputField
                                        placeholder="Ex: Junior20"
                                        error={formState.errors.username}
                                        registration={register('username')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        label={'Username'}
                                        type="text"
                                    />
                                    <SelectField
                                        options={UserRolesOptions}
                                        label={'Role'}
                                        error={formState.errors.role}
                                        registration={register('role')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        placeholder={'Select Role'}
                                    />
                                    <InputField
                                        placeholder="**********"
                                        error={formState.errors.password}
                                        registration={register('password')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        label={'Password'}
                                        type="password"
                                    />
                                    <InputField
                                        placeholder="**********"
                                        error={
                                            formState.errors.confirm_password
                                        }
                                        registration={register(
                                            'confirm_password'
                                        )}
                                        className="h-12"
                                        isLoading={isLoading}
                                        label={'Confirm Password'}
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

export default CreateUserModal;
