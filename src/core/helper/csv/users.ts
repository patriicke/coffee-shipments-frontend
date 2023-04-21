import { UserType } from '~/core/types';
import { ColumnType } from '~/core/utils';

export const UsersColumnCSV: ColumnType<UserType>[] = [
    {
        label: 'Names',
        selector: row => row.name,
    },
    {
        label: 'Username',
        selector: row => row.username,
    },
    {
        label: 'Country',
        selector: row => row.country,
    },
    {
        label: 'Region',
        selector: row => row.region,
    },
    {
        label: 'Address',
        selector: row => row.address,
    },
    {
        label: 'Role',
        selector: row => row.role,
    },
];
