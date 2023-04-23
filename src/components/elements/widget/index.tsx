import React from 'react';
import { Link } from 'react-router-dom';

type WidgetProps = {
    title: string;
    href: string;
    data: string;
    className?: string;
    image?: string;
};

export const Widget = (props: WidgetProps) => {
    const { href, data, title, className, image } = props;
    return (
        <div
            className={`flex h-32 min-w-[29em] justify-between border-l-4 border-[#1A74E2] bg-white px-5 py-0 ${className}`}
        >
            <div className="py-7">
                <h2 className="text-[25px] font-bold text-[#747070]">
                    {title}
                </h2>
                <Link
                    to={href}
                    className="mt-3 flex items-center text-[15px] font-medium text-[#1A74E2]"
                >
                    View more
                </Link>
            </div>
            <div className="relative flex h-full items-center justify-center">
                <img src={image} className="w-16" />
                <span className="absolute left-1 top-1/3 w-full text-center text-[30px]">
                    {data}
                </span>
            </div>
        </div>
    );
};
