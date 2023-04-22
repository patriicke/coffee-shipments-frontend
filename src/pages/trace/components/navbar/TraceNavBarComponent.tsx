import React from 'react';
import { useSelector } from 'react-redux';
import { ICONS } from '~/assets/icons';
import { REDUX_STORE_TYPE } from '~/core/redux/store';

export const TraceNavBarComponent: React.FC = () => {
    const { userData } = useSelector((state: REDUX_STORE_TYPE) => state.user);

    return (
        <div className="flex h-20 w-full items-center justify-end border-opacity-40 bg-primary-500 bg-opacity-30">
            <div className="mr-10">
                <div className="group relative">
                    <button>
                        <img
                            src={ICONS.Person}
                            alt="Image"
                            className="h-12 w-12 rounded-full object-cover"
                        />
                    </button>
                    <div
                        className="absolute top-[50px] right-3 z-50 hidden w-[14rem] list-none flex-col divide-y divide-gray-100 rounded border bg-white text-sm shadow group-hover:flex"
                        id="dropdown"
                    >
                        <div className="px-4 py-3">
                            <span className="block truncate font-medium text-primary-500">
                                {userData?.name}
                            </span>
                            <span className="block truncate font-medium text-gray-900">
                                @{userData?.username}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
