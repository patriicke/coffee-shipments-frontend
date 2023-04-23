import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get_all_shippings } from '~/api/ship';
import { get_all_users } from '~/api/user';
import { WidgetImages } from '~/assets/images/widgets';
import { Widget } from '~/components/elements/widget';
import { UserType } from '~/core/types';
import { PaginationType } from '~/core/types/pagination';
import { ShippingType } from '~/core/types/shippings';

export const TraceDashboardPage: React.FC = () => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<
        PaginationType<UserType> | null | undefined
    >();
    const [shippings, setShippings] = useState<
        PaginationType<ShippingType> | null | undefined
    >();

    const handle_get_data = async () => {
        try {
            setIsLoading(true);
            const shippings_data: PaginationType<ShippingType> =
                await get_all_shippings();
            const users_data: PaginationType<UserType> = await get_all_users();
            setShippings(shippings_data);
            setUsers(users_data);
        } catch (error: any) {
            toast.error(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handle_get_data();
    }, []);

    return (
        <div className="h-full w-full">
            <h1 className="py-3">
                <span className="text-secondary-600 text-[20px] font-semibold">
                    DASHBOARD
                </span>
            </h1>
            <div className="flex w-full flex-wrap items-center gap-12">
                <Widget
                    href="/"
                    data={loading ? '...' : users?.total.toString() ?? '0'}
                    title={'Users'}
                    image={WidgetImages.FirstWidget}
                />
                <Widget
                    href="/"
                    data={loading ? '...' : shippings?.total.toString() ?? '0'}
                    title={'Shippings'}
                    image={WidgetImages.SecondWidget}
                />
                <Widget
                    href="/"
                    data={loading ? '...' : '0'}
                    title={'Pendings'}
                    image={WidgetImages.ThirdWidget}
                />
            </div>
        </div>
    );
};
