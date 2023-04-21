import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { AuthImages } from '~/assets/images/background/auth';
import { Button, Form, InputField } from '~/components/elements';
import { adduserRedux } from '~/core/redux/slices/userSlice';
import { storage } from '~/core/utils';
import { RegisterUserDTO, register_user } from '~/api/user';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    username: z.string().min(1, 'Username is required'),
    country: z.string().min(1, 'Country Username is required'),
    region: z.string().min(1, 'Region Username is required'),
    address: z.string().min(1, 'Address is required'),
    role: z.string().min(1, 'Role is required'),
    password: z.string().min(1, 'Password is required'),
    confirm_password: z.string().min(1, 'Confirm Password is required'),
});

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();

    const [error, setError] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (payload: RegisterUserDTO) => {
        try {
            setError('');
            setIsLoading(true);
            const data = await register_user(payload);
            const { access_token, user } = data;
            storage.setToken(access_token);
            dispatch(adduserRedux(user));
            window.location.reload();
        } catch (error: any) {
            setError(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <Helmet>
                <title>Register - COFFEE SHIPMENT</title>
            </Helmet>
            <div className="flex h-screen w-screen object-cover">
                <img
                    src={AuthImages.CreateAccoutBackgroundImage}
                    alt="Page Desc Image"
                    className="hidden xl:block xl:w-3/5"
                />
                <section className="flex h-full w-full items-center justify-center py-20 lg:py-[120px] xl:w-2/5">
                    <div className="container mx-auto">
                        <div className="-mx-4 flex flex-wrap">
                            <div className="w-full px-4 ">
                                <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-20 px-10 sm:px-12 md:px-[60px]">
                                    <div className="flex flex-col pb-3 text-2xl font-semibold">
                                        <span>Hey,</span>
                                        <span>Register Here</span>
                                    </div>
                                    <Form<
                                        RegisterUserDTO & {
                                            confirm_password: string;
                                        },
                                        typeof schema
                                    >
                                        schema={schema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ register, formState }) => (
                                            <>
                                                <div className="flex flex-col gap-4">
                                                    <InputField
                                                        placeholder="Enter Your Username or Email"
                                                        error={
                                                            formState.errors
                                                                .name
                                                        }
                                                        registration={register(
                                                            'name'
                                                        )}
                                                        className="h-12"
                                                        isLoading={isLoading}
                                                        type="text"
                                                    />

                                                    <InputField
                                                        placeholder="Enter Your Password"
                                                        error={
                                                            formState.errors
                                                                .password
                                                        }
                                                        registration={register(
                                                            'password'
                                                        )}
                                                        className="h-12"
                                                        isLoading={isLoading}
                                                        type="password"
                                                    />
                                                </div>

                                                <p className="md:text-md mt-3 text-sm">
                                                    Already have an account?
                                                    <Link
                                                        to={'/auth/login'}
                                                        className="mx-1 text-primary-500 underline hover:underline"
                                                    >
                                                        Login
                                                    </Link>
                                                </p>
                                                {error && (
                                                    <div className="md:text-md flex flex-col gap-4 pt-2 text-xs">
                                                        <p className="text-red-600">
                                                            {error}
                                                        </p>
                                                    </div>
                                                )}
                                                <Button
                                                    type="submit"
                                                    variant="bg-primary-500"
                                                    className="text-md mt-4 w-full font-semibold"
                                                    isLoading={isLoading}
                                                >
                                                    Login
                                                </Button>
                                            </>
                                        )}
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default RegisterPage;
