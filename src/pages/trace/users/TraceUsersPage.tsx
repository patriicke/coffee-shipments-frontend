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
import { exportToCSV, updateQuerySearchParams } from '~/core/utils';
import { UserType } from '~/core/types/user';
import { delete_user, get_all_users } from '~/api/user';
import { UsersColumnCSV } from '~/core/helper';
import CreateUserModal from '../components/modals/users/CreateUserModal';
import { UpdateUserModal } from '../components/modals/users/UpdateUserModal';

export const TraceUsersPage = () => {
    const location = useLocation();

    const query = location.search;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingDeleteUser, setIsLoadingDeleteUser] =
        useState<boolean>(false);

    const navigate = useNavigate();

    const [users, setUsers] = useState<
        PaginationType<UserType> | null | undefined
    >();
    const [currentUser, setCurrentUser] = useState<UserType>();

    const [keyword, setKeyword] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const [isAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);
    const [isUpdateUserOpen, setIsUpdateUserOpen] = useState<boolean>(false);
    const [isDeleteUserOpen, setIsDeleteUserOpen] = useState<boolean>(false);

    const handleGetUsers = async () => {
        try {
            setIsLoading(true);
            setUsers(null);
            const data: PaginationType<UserType> = await get_all_users(query);
            setUsers(data);
        } catch (error: any) {
            toast.error(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportUsers = () => {
        exportToCSV('Users', UsersColumnCSV, users?.list ?? []);
    };

    const handleAddUser = () => {
        setIsAddUserOpen(true);
    };

    const handleDeleteUser = (client: UserType) => {
        setCurrentUser(client);
        setIsDeleteUserOpen(true);
    };

    const handleUpdateUser = (client: UserType) => {
        setCurrentUser(client);
        setIsUpdateUserOpen(true);
    };

    const deleteUser = async () => {
        try {
            setIsLoadingDeleteUser(true);
            if (!currentUser?.id) return;
            await delete_user(currentUser.id);
            const updated = {
                ...users,
                list: users?.list?.filter(
                    client => client.id !== currentUser?.id
                ),
            };
            setUsers(updated as PaginationType<UserType>);
            setIsDeleteUserOpen(false);
            toast.success('User deleted successfully');
        } catch (error: any) {
            toast.error(error.response.message);
        } finally {
            setIsLoadingDeleteUser(false);
        }
    };

    const columns: TableColumn<UserType>[] = [
        {
            title: 'Names',
            cell: row => row.name,
        },
        {
            title: 'Username',
            cell: row => row.username,
        },
        {
            title: 'Country',
            cell: row => row.country,
        }, {
            title: 'Region',
            cell: row => row.region,
        }, {
            title: 'Address',
            cell: row => row.address,
        },
        {
            title: 'Role',
            cell: row => row.role,
        },
        {
            title: 'Actions',
            cell: row => (
                <div className="flex gap-3">
                    <BookEditButton onClick={() => handleUpdateUser(row)} />
                    <DeleteButton onClick={() => handleDeleteUser(row)} />
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
            handleGetUsers();
    }, [query]);
    return (
        <div>
            <div className="mt-4 inline-block w-full border bg-[white] py-10 px-10 align-middle">
                <h1 className="mb-4 flex w-full flex-wrap items-center justify-between">
                    <span className="text-secondary-600 text-2xl font-semibold">
                        USERS
                    </span>
                    <div className="flex w-fit flex-wrap gap-3">
                        <ExportButton onClick={handleExportUsers} />
                        <AddNewButton onClick={handleAddUser} />
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
                    currentPage={users?.currentPage ?? 0}
                    data={users?.list ?? []}
                    isLoading={isLoading}
                    lastPage={users?.lastPage ?? 0}
                    nextPage={users?.nextPage ?? 0}
                    previousPage={users?.previousPage ?? 0}
                    total={users?.total ?? 0}
                />
            </div>
            <Modal
                children={
                    <CreateUserModal onClose={() => setIsAddUserOpen(false)} />
                }
                isOpen={isAddUserOpen}
                onClose={() => setIsAddUserOpen(false)}
            />

            {currentUser?.id && (
                <Modal
                    children={
                        <UpdateUserModal
                            onClose={() => setIsUpdateUserOpen(false)}
                            user={currentUser}
                        />
                    }
                    isOpen={isUpdateUserOpen}
                    onClose={() => setIsUpdateUserOpen(false)}
                />
            )}

            <AlertModal
                accept_button_title="Delete"
                cancel_button_title="Cancel"
                action={deleteUser}
                isOpen={isDeleteUserOpen}
                title={`Are you sure you want to Delete ${currentUser?.name}`}
                onClose={() => setIsDeleteUserOpen(false)}
                isLoading={isLoadingDeleteUser}
            />
        </div>
    );
};
