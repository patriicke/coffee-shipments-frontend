import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Illustrations } from '~/assets/images/illustrations';
import LogoSVG from '~/assets/svgs/LogoSVG';

const HomePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>COFFEE TRACEABILITY</title>
            </Helmet>
            <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-primary-500">
                <img
                    src={Illustrations.HomeIllustration}
                    className="absolute top-0 z-0 h-screen w-screen object-cover blur-md"
                />
                <div className="fixed z-50 h-full w-full bg-opacity-0">
                    <div className="flex h-20 w-full justify-between px-4 text-white lg:px-10  xl:px-20">
                        <div className="relative flex gap-2">
                            <LogoSVG
                                width={40}
                                className="flex items-center justify-center"
                            />
                            <span className="flex items-center justify-center text-base">
                                COFFEE TRACEABILITY
                            </span>
                        </div>
                        <ul className="hidden items-center justify-center gap-6 text-base lg:flex">
                            <Link
                                to={'#'}
                                className="hover:underline hover:underline-offset-4"
                            >
                                HOME
                            </Link>
                            <Link
                                to={'#'}
                                className="hover:underline hover:underline-offset-4"
                            >
                                ABOUT
                            </Link>
                            <Link
                                to={'#'}
                                className="hover:underline hover:underline-offset-4"
                            >
                                MENU
                            </Link>
                            <Link
                                to={'#'}
                                className="hover:underline hover:underline-offset-4"
                            >
                                CONTACTS
                            </Link>
                            <Link
                                to={'#'}
                                className="hover:underline hover:underline-offset-4"
                            >
                                BLOGS
                            </Link>
                        </ul>
                        <div className="flex items-center justify-center gap-5 text-base">
                            <Link
                                to="/auth/register"
                                className="rounded-[2em] bg-secondary-500 py-2 px-6"
                            >
                                REGISTER
                            </Link>
                            <Link
                                to="/auth/login"
                                className="rounded-[2em] bg-secondary-500 py-2 px-6"
                            >
                                LOGIN
                            </Link>
                        </div>
                    </div>
                    <div className="lx:px-10 flex h-[calc(100%_-_5rem)] w-full items-center px-4   xl:px-20">
                        <div className="flex flex-col items-center justify-center gap-5 md:items-start md:justify-start">
                            <h1 className="w-[10em] text-center text-[2em] font-bold text-white md:text-start xl:w-[12em] xl:text-[3em]">
                                COFFEE TRACEABILITY MADE SIMPLE
                            </h1>
                            <p className="w-4/8 text-base font-light text-white xl:w-1/4">
                                The coffee shipment tracking system is a
                                comprehensive tool that enables users to monitor
                                the movement of coffee shipments throughout the
                                supply chain. With this system, you can gain
                                visibility into the status of your coffee
                                shipments from the moment they leave the origin
                                until they arrive at the final destination.
                            </p>
                            <Link
                                to={'/trace'}
                                className="w-fit rounded-[3em] bg-secondary-500 px-10 py-4 font-semibold text-white"
                            >
                                TRACE NOW
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
