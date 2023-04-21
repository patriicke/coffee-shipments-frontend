import { UserType } from '~/core/types';
import { ColumnType } from '~/core/utils';

export const UsersColumnCSV: ColumnType<UserType>[] = [
    {
        label: 'Names',
        selector: row => row.fullname,
    },
    {
        label: 'Username',
        selector: row => row.username,
    },
    {
        label: 'Email',
        selector: row => row.email,
    },
    {
        label: 'Role',
        selector: row => row.role,
    },

    {
        label: 'Status',
        selector: row => row.status,
    },
];
