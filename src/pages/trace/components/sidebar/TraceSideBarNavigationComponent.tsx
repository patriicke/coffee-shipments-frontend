import {
    faCoffee,
    faHouse,
    faShip,
    faUser,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AdminContext,
    AdminContextType,
} from '~/core/provider/admin/AdminProvider';

export type LinksType = {
    title: string;
    href: string;
    icon: IconDefinition;
};

export const TraceSideBarNavigationComponent: React.FC = () => {
    const [tab, setTab] = useState(0);

    const { toggleSidebar } = useContext<AdminContextType>(AdminContext);

    const links: LinksType[] = [
        {
            title: 'Dashboard',
            href: '',
            icon: faHouse,
        },
        {
            title: 'Users',
            href: '/users',
            icon: faUser,
        },
        {
            title: 'Shippings',
            href: '/shippings',
            icon: faCoffee,
        },
    ];

    useEffect(() => {
        links.map((link, index) => {
            if (window.location.href.includes(link.href)) setTab(index);
        });
    }, []);

    return (
        <section className="flex h-full w-full pt-20">
            <ul className="flex w-full flex-col gap-2">
                {links.map(({ href, icon, title }, index) => {
                    return (
                        <li
                            onClick={() => {
                                setTab(index);
                                toggleSidebar();
                            }}
                            key={index}
                        >
                            {tab === index ? (
                                <Link
                                    to={`/trace${href}`}
                                    className="flex items-center gap-2 rounded-md bg-secondary-500 p-2 text-white"
                                >
                                    <FontAwesomeIcon
                                        icon={icon}
                                        className="text-md"
                                    />
                                    {title}
                                </Link>
                            ) : (
                                <Link
                                    to={`/trace${href}`}
                                    className="flex items-center gap-2 p-2"
                                >
                                    <FontAwesomeIcon
                                        icon={icon}
                                        className="text-md"
                                    />
                                    {title}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
