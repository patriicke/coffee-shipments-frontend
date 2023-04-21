import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { AuthImages } from '~/assets/images/background/auth';
import { Button, Form, InputField, SelectField } from '~/components/elements';
import { adduserRedux } from '~/core/redux/slices/userSlice';
import { storage } from '~/core/utils';
import { RegisterUserDTO, register_user } from '~/api/user';
import { countries } from '~/data';

const schema = z
    .object({
        name: z.string().min(1, 'Name is required'),
        username: z.string().min(1, 'Username is required'),
        country: z.string().min(1, 'Country Name is required'),
        region: z.string().min(1, 'Region is required'),
        address: z.string().min(1, 'Address is required'),
        // role: z.string().min(1, 'Role is required'),
        password: z.string().min(1, 'Password is required'),
        confirm_password: z.string().min(1, 'Confirm Password is required'),
    })
    .refine(data => data.password === data.confirm_password, {
        message: 'Passwords don\'t match',
        path: ['confirm_password'],
    });

type CountryType = {
    value: string;
    label: string;
};

const select_countries: CountryType[] = countries.map(
    (country: { name: string; code: string }) => {
        return {
            value: country.name,
            label: country.name,
        };
    }
);

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
                <title>Register - COFFEE TRACEABLITY</title>
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
                                    <div className="flex flex-col pb-4 text-xl font-medium">
                                        <span className="w-full text-center">
                                            Create an account here
                                        </span>
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
                                                        placeholder="Enter Your Names"
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
                                                        placeholder="Enter Your Username"
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
                                                    <SelectField
                                                        options={
                                                            select_countries
                                                        }
                                                        label={'Country Name'}
                                                        error={
                                                            formState.errors
                                                                .country
                                                        }
                                                        registration={register(
                                                            'country'
                                                        )}
                                                        className="h-12"
                                                        isLoading={isLoading}
                                                        placeholder={
                                                            'Select Country'
                                                        }
                                                    />
                                                    <InputField
                                                        placeholder="Enter Your Region"
                                                        error={
                                                            formState.errors
                                                                .region
                                                        }
                                                        registration={register(
                                                            'region'
                                                        )}
                                                        className="h-12"
                                                        isLoading={isLoading}
                                                        type="text"
                                                    />
                                                    <InputField
                                                        placeholder="Enter Your Address"
                                                        error={
                                                            formState.errors
                                                                .address
                                                        }
                                                        registration={register(
                                                            'address'
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
                                                    <InputField
                                                        placeholder="Confirm Your Password"
                                                        error={
                                                            formState.errors
                                                                .confirm_password
                                                        }
                                                        registration={register(
                                                            'confirm_password'
                                                        )}
                                                        className="h-12"
                                                        isLoading={isLoading}
                                                        type="password"
                                                    />
                                                </div>

                                                <p className="md:text-md my-5 text-sm">
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
                                                    Register
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
