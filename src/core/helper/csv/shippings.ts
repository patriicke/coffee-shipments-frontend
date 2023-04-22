import { ShippingType } from '~/core/types/shippings';
import { ColumnType, format } from '~/core/utils';

export const ShippingsColumnCSV: ColumnType<ShippingType>[] = [
    {
        label: 'Origin',
        selector: row => row.origin,
    },
    {
        label: 'Destination',
        selector: row => row.destination,
    },
    {
        label: 'Quantity',
        selector: row => row.quantity,
    },
    {
        label: 'Status',
        selector: row => row.status,
    },
    {
        label: 'Started At',
        selector: row => format.exportHumanDateTime(row.createdAt),
    },
    {
        label: 'Updated At',
        selector: row => format.exportHumanDateTime(row.updatedAt),
    },
];
