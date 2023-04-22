/* eslint-disable no-unused-vars */
import {
    AddNewButton,
    AlertModal,
    BookEditButton,
    DataTable,
    DeleteButton,
    ExportButton,
    Modal,
    TableColumn,
} from '~/components/elements';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaginationType } from '~/core/types/pagination';
import { exportToCSV, format, updateQuerySearchParams } from '~/core/utils';
import { delete_user, get_all_users } from '~/api/user';
import { ShippingType } from '~/core/types/shippings';
import { get_all_shippings } from '~/api/ship';
import { ShippingsColumnCSV } from '~/core/helper/csv/shippings';
import { CreateShippingModal } from '../components/modals/shippings/CreateShippingModal';
import { UpdateShippingModal } from '../components/modals/shippings/UpdateShippingModal';

export const TraceShippingsPage = () => {
    const location = useLocation();

    const query = location.search;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingDeleteShip, setIsLoadingDeleteShip] =
        useState<boolean>(false);

    const navigate = useNavigate();

    const [shippings, setShippings] = useState<
        PaginationType<ShippingType> | null | undefined
    >();
    const [currentShipping, setCurrentShipping] = useState<ShippingType>();

    const [keyword, setKeyword] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const [isAddShippingOpen, setIsAddShippingOpen] = useState<boolean>(false);
    const [isUpdateShippingOpen, setIsUpdateShippingOpen] =
        useState<boolean>(false);
    const [isDeleteShippingOpen, setIsDeleteShippingOpen] =
        useState<boolean>(false);

    const handleGetShippings = async () => {
        try {
            setIsLoading(true);
            setShippings(null);
            const data: PaginationType<ShippingType> = await get_all_shippings(
                query
            );
            setShippings(data);
        } catch (error: any) {
            toast.error(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportShipping = () => {
        exportToCSV('Shippings', ShippingsColumnCSV, shippings?.list ?? []);
    };

    const handleAddShippings = () => {
        setIsAddShippingOpen(true);
    };

    const handleDeleteShippings = (client: ShippingType) => {
        setCurrentShipping(client);
        setIsDeleteShippingOpen(true);
    };

    const handleUpdateUser = (client: ShippingType) => {
        setCurrentShipping(client);
        setIsUpdateShippingOpen(true);
    };

    const handleUpdateShippingSuccess = (client: ShippingType) => {
        const updated_list = shippings?.list.map(ship => {
            if (ship.id === client.id) return client;
            return ship;
        });
        setShippings({
            ...shippings,
            list: updated_list,
        } as PaginationType<ShippingType>);
    };

    const deleteShip = async () => {
        try {
            setIsLoadingDeleteShip(true);
            if (!currentShipping?.id) return;
            await delete_user(currentShipping.id);
            const updated = {
                ...shippings,
                list: shippings?.list?.filter(
                    ship => ship.id !== currentShipping?.id
                ),
            };
            setShippings(updated as PaginationType<ShippingType>);
            setIsDeleteShippingOpen(false);
            toast.success('Shipping deleted successfully');
        } catch (error: any) {
            toast.error(error.response.message);
        } finally {
            setIsLoadingDeleteShip(false);
        }
    };

    const columns: TableColumn<ShippingType>[] = [
        {
            title: 'Origin',
            cell: row => row.origin,
        },
        {
            title: 'Destination',
            cell: row => row.destination,
        },
        {
            title: 'Quantity',
            cell: row => row.quantity,
        },
        {
            title: 'Status',
            cell: row => row.status,
        },
        {
            title: 'Started At',
            cell: row => format.humanDateTime(row.createdAt),
        },
        {
            title: 'Updated At',
            cell: row => format.humanDate(row.updatedAt),
        },
        {
            title: 'Actions',
            cell: row => (
                <div className="flex gap-3">
                    <BookEditButton onClick={() => handleUpdateUser(row)} />
                    {/* <DeleteButton onClick={() => handleDeleteShippings(row)} /> */}
                </div>
            ),
        },
    ];

    useEffect(() => {
        updateQuerySearchParams(navigate, keyword);
    }, [keyword]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('pageNumber') && searchParams.has('pageSize'))
            handleGetShippings();
    }, [query]);
    return (
        <div>
            <div className="mt-4 inline-block w-full border bg-[white] py-10 px-10 align-middle">
                <h1 className="mb-4 flex w-full flex-wrap items-center justify-between">
                    <span className="text-secondary-600 text-2xl font-semibold">
                        SHIPPINGS
                    </span>
                    <div className="flex w-fit flex-wrap gap-3">
                        <ExportButton onClick={handleExportShipping} />
                        <AddNewButton onClick={handleAddShippings} />
                        <input
                            type="text"
                            className="flex items-center rounded-md border border-slate-300 bg-slate-200 text-base font-medium"
                            placeholder="Search..."
                            defaultValue={keyword}
                            id="search"
                            onChange={handleChange}
                        />
                    </div>
                </h1>
                <DataTable
                    columns={columns}
                    currentPage={shippings?.currentPage ?? 0}
                    data={shippings?.list ?? []}
                    isLoading={isLoading}
                    lastPage={shippings?.lastPage ?? 0}
                    nextPage={shippings?.nextPage ?? 0}
                    previousPage={shippings?.previousPage ?? 0}
                    total={shippings?.total ?? 0}
                />
            </div>
            <Modal
                children={
                    <CreateShippingModal
                        onClose={() => setIsAddShippingOpen(false)}
                    />
                }
                isOpen={isAddShippingOpen}
                onClose={() => setIsAddShippingOpen(false)}
            />

            {currentShipping?.id && (
                <Modal
                    children={
                        <UpdateShippingModal
                            onClose={() => setIsUpdateShippingOpen(false)}
                            ship={currentShipping}
                            successFunction={handleUpdateShippingSuccess}
                        />
                    }
                    isOpen={isUpdateShippingOpen}
                    onClose={() => setIsUpdateShippingOpen(false)}
                />
            )}

            <AlertModal
                accept_button_title="Delete"
                cancel_button_title="Cancel"
                action={deleteShip}
                isOpen={isDeleteShippingOpen}
                title={'Are you sure you want to Delete'}
                onClose={() => setIsDeleteShippingOpen(false)}
                isLoading={isLoadingDeleteShip}
            />
        </div>
    );
};
