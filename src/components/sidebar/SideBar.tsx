import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import {
    AdminContext,
    AdminContextType,
} from '~/core/provider/admin/AdminProvider';

export const SideBar: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isSidebarOpen, closeSidebar } =
        useContext<AdminContextType>(AdminContext);

    const SIDE_BAR_ELEMENT = useRef<any>(null);

    useEffect(() => {
        const clickEvent = () => {
            if (!SIDE_BAR_ELEMENT.current?.contains(event?.target))
                closeSidebar();
        };
        document.addEventListener('mousedown', clickEvent);
        return () => {
            document.removeEventListener('mousedown', clickEvent);
        };
    }, [SIDE_BAR_ELEMENT]);

    return (
        <aside
            className={`h-full min-w-[20rem] ${
                isSidebarOpen ? 'absolute block md:relative' : 'hidden md:block'
            } z-50  gap-2 px-4 md:w-1/5  `}
            ref={SIDE_BAR_ELEMENT}
        >
            <div className="relative flex h-20 items-center  gap-2 text-primary-500">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 52 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_5_39)">
                        <path
                            d="M29.6184 25.5312C29.3946 20.5586 29.0962 17.8867 26.1119 14.6211C22.3071 10.3906 20.8896 6.30859 24.023 0C24.8437 4.23047 25.1421 8.01562 28.1263 10.3164C31.1105 12.6172 33.5725 18.8516 29.6184 25.5312ZM24.023 25.5312C23.8738 22.8594 23.7246 21.5234 22.0833 19.668C20.0689 17.4414 19.2482 15.2891 20.9642 11.875C21.4118 14.1758 21.4864 16.1797 23.1277 17.3672C24.7691 18.5547 26.1866 21.9688 24.023 25.5312ZM37.5266 48.9844H51.1048C51.9254 48.9844 52.2239 49.5781 51.7016 50.2461C51.7016 50.2461 46.4046 57 39.0933 57H12.9068L0.298451 50.2461C-0.223787 49.5781 2.9223e-05 48.9844 0.82069 48.9844H14.2497C12.3845 48.0195 9.62414 43.7891 9.62414 38.5195V27.3867H42.3013V28.2773C43.3458 27.3867 44.6141 26.9414 45.957 26.9414C47.8221 26.9414 51.3286 28.8711 51.3286 32.2109C51.3286 37.0352 48.1206 38.8164 46.2554 40.0781C46.2554 40.0781 42.749 42.8242 40.287 46.0156C39.4663 47.4258 38.4965 48.5391 37.5266 48.9844ZM45.957 28.9453C44.7633 28.9453 43.2712 29.4648 42.3013 31.8398V38C42.3013 38.8164 42.2267 39.7812 42.0775 40.5977C43.7188 38.9648 45.6586 37.8516 45.6586 37.8516C46.8523 37.0352 49.2397 35.4766 49.2397 32.4336C49.3143 30.2812 47.2999 28.9453 45.957 28.9453ZM15.2942 29.8359H13.2052V32.8789H15.2942V29.8359ZM15.2942 34.6602H13.2052V39.6328C13.2052 39.6328 13.802 46.3125 18.0546 48.3164C15.4434 45.2734 15.2942 41.7852 15.2942 39.6328V34.6602Z"
                            fill="#6F4E37"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_5_39">
                            <rect width="52" height="57" fill="#6F4E37" />
                        </clipPath>
                    </defs>
                </svg>
                <span className="flex items-center justify-center pt-3 text-sm font-semibold">
                    <span>COFFEE TRACEABILITY</span>
                </span>
            </div>
            <div className="z-20 h-full overflow-y-auto duration-150 ease-in-out">
                {children}
            </div>
        </aside>
    );
};
