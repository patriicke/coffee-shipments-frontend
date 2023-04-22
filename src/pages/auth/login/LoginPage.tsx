import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { LoginUserDTO, login_user } from '~/api/auth';
import { AuthImages } from '~/assets/images/background/auth';
import { Button, Form, InputField } from '~/components/elements';
import { adduserRedux } from '~/core/redux/slices/userSlice';
import { storage } from '~/core/utils';

const schema = z.object({
    username: z.string().min(1, 'Email or Username is required'),
    password: z.string().min(1, 'Password is required'),
});

export type AuthLoginPayload = {
    email: string;
    password: string;
};

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();

    const [error, setError] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (payload: LoginUserDTO) => {
        try {
            setError('');
            setIsLoading(true);
            const data = await login_user(payload);
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
                <title>Login - COFFEE TRACEABILITY</title>
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
                                <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg border border-primary-500 bg-white py-20 px-10 sm:px-12 md:px-[60px]">
                                    <div className="flex flex-col gap-1 pb-4 text-center">
                                        <h1 className="w-full text-xl font-medium">
                                            Welcome Back
                                        </h1>
                                        <span className="w-full">
                                            Enter your credentials to log in
                                            again!
                                        </span>
                                    </div>
                                    <Form<LoginUserDTO, typeof schema>
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
                                                                .username
                                                        }
                                                        registration={register(
                                                            'username'
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
                                                    Don't have an account?
                                                    <Link
                                                        to={'/auth/register'}
                                                        className="mx-1 text-primary-500 underline hover:underline"
                                                    >
                                                        Register
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

export default LoginPage;
