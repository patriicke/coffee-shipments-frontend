import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Illustrations } from '~/assets/images/illustrations';
import LogoSVG from '~/assets/svgs/LogoSVG';

const HomePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>HOME- COFFEE SHIPMENT - TRACK SHIPMENT</title>
            </Helmet>
            <div className="h-screen w-screen overflow-y-auto overflow-x-hidden">
                <img
                    src={Illustrations.HomeIllustration}
                    className="absolute top-0 z-0 h-screen w-screen object-fill blur-md"
                />
                <div className="fixed z-50 h-full w-full bg-opacity-0">
                    <div className="flex h-20 w-full items-center justify-between px-20  text-white">
                        <div className="relative flex h-full items-center justify-center gap-2">
                            <LogoSVG
                                width={40}
                                className="flex h-full items-center justify-center"
                            />
                            <span className="flex h-full items-center justify-center text-base">
                                COFFEE SHIPMENT
                            </span>
                        </div>
                        <ul className="flex items-center justify-center gap-6 text-base">
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
                        <div className="flex items-center justify-center gap-5 text-base font-medium">
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
                    <div className="flex h-[calc(100%_-_5rem)] w-full items-center px-20">
                        <div className="flex flex-col gap-5">
                            <h1 className="w-[10em] text-[3em] font-bold text-white">
                                COFFEE SHIPMENT MADE SIMPLE
                            </h1>
                            <p className="w-1/4 text-base font-light text-white">
                                The coffee shipment tracking system is a
                                comprehensive tool that enables users to monitor
                                the movement of coffee shipments throughout the
                                supply chain. With this system, you can gain
                                visibility into the status of your coffee
                                shipments from the moment they leave the origin
                                until they arrive at the final destination.
                            </p>
                            <Link
                                to={'/ship'}
                                className="w-fit rounded-[3em] bg-secondary-500 px-12 py-5 font-semibold text-white"
                            >
                                SHIP NOW
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
