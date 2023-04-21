import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>404 - Not Found</title>
                <meta name="description" content="Page not found" />
            </Helmet>
            <section className="relative z-10 flex h-screen w-screen items-center justify-center bg-primary-500">
                <div className="container mx-auto">
                    <div className="-mx-4 flex">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[400px] text-center">
                                <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                                    404
                                </h2>
                                <h4 className="text-md mb-3 font-semibold leading-tight text-white">
                                    Oops! The page you're looking for is not
                                    found.
                                </h4>
                                <Link
                                    className="text-md inline-block rounded-lg border border-secondary-500 px-8 py-3 text-center font-semibold text-white transition hover:bg-secondary-500 hover:text-primary-500"
                                    to={'/'}
                                >
                                    Go Back Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
                    <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
                    <div className="flex h-full w-1/3">
                        <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                        <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
                    </div>
                    <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                </div>
            </section>
        </>
    );
};

export default NotFoundPage;
