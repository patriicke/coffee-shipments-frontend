/* eslint-disable no-unused-vars */
import { format } from './format';
export type ColumnType<Entry> = {
    label: string;
    selector: (row: Entry, index: number) => void;
};

export const exportToCSV = <Entry>(
    fileName: string,
    columns: ColumnType<Entry>[],
    data: Entry[]
) => {
    let csvText = '';

    const columnDelimiter = ',';

    const lineDelimiter = '\n';

    const labels: string[] = [];

    columns.forEach(column => labels.push(column.label));

    csvText += labels.join(columnDelimiter);
    csvText += lineDelimiter;

    data.forEach((element: Entry, index: number) => {
        let ctr = 0;

        columns.forEach(column => {
            if (ctr > 0) csvText += columnDelimiter;

            csvText += column.selector(element, index);

            ctr++;
        });

        csvText += lineDelimiter;
    });

    if (!csvText) return;

    const link = document.createElement('a');

    const file = `COFFEE-TRACEABLITY - ${fileName} - ${format.todayDate()}.csv`;

    if (!csvText.match(/^data:text\/csv/i))
        csvText = `data:text/csv;charset=utf-8,${csvText}`;

    link.setAttribute('href', encodeURI(csvText));
    link.setAttribute('download', file);
    link.click();
};
