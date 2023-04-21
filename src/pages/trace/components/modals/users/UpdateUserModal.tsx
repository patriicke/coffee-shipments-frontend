import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { ICONS } from '~/assets/icons';
import {
    Button,
    Form,
    InputField,
    ModalProps,
    SelectField,
} from '~/components/elements';
import { UserType } from '~/core/types';
import { UserRolesOptions } from './CreateUserModal';
import { RegisterUserDTO } from '~/api/user';

const schema = z.object({
    role: z.string().min(1, 'Role is required'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email(),
    username: z.string().min(1, 'Username is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
});

export const UpdateUserModal: React.FC<
    ModalProps & { user: UserType }
> = props => {
    const { onClose, user } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (payload: RegisterUserDTO) => {
        try {
            setIsLoading(true);
            if (
                user.role === payload.role &&
                user.name === payload.name &&
                user.username === payload.username
            ) {
                toast.warn('Nothing  to update');
                return;
            }
            // await update_user(user.id, payload);
            toast.success('User updated successfully');
            onClose();
        } catch (error: any) {
            toast.error(error.response.message.toString());
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-full w-full justify-end rounded-md p-2">
            <div className="flex h-full w-full max-w-[32em] flex-col gap-3 bg-white p-7 md:w-2/4 xl:w-2/5">
                <div className="flex items-center  justify-between">
                    <h1 className="text-xl font-semibold text-primary-500">
                        Update {user.name}
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
                        options={{ defaultValues: user }}
                    >
                        {({ register, formState }) => (
                            <>
                                {/* <div className="flex flex-col gap-4">
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
                                        placeholder="Ex: example@gmail.com"
                                        error={formState.errors.email}
                                        registration={register('email')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        label={'Email'}
                                        type="email"
                                    />
                                    <InputField
                                        placeholder="Ex: 0788888888"
                                        error={formState.errors.phoneNumber}
                                        registration={register('phoneNumber')}
                                        className="h-12"
                                        isLoading={isLoading}
                                        label={'Phone Number'}
                                        type="text"
                                    />
                                </div> */}
                                <Button
                                    type="submit"
                                    variant="bg-primary-500"
                                    className="text-md mt-4 w-full font-semibold"
                                    isLoading={isLoading}
                                >
                                    UPDATE
                                </Button>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
};
