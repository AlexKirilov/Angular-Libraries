import { MatTableDataSource } from '@angular/material';

export class PagginationDetailsI {
    pageSize: number;
    rowCount: number;
    pageCount: number;
    currentPage: number;
    lastRowOnPage: number;
    firstRowOnPage: number;
}

//////
export class TablePropertiesI {
    fullDate?: boolean;
    cbSelectAll?: boolean;
    clickableRows?: boolean;
    tableColumnNames: object;
    isServerPagging?: boolean;
    inputfields?: Array<string>;
    columnsWithToolTip?: Array<string>;
    dateTransformNames?: Array<string>;
    numberCorrectionList?: Array<string>;
    details: TableDetailsI;
}

export class CheckboxDataI {
    id: any;
    selected: boolean;
}

export class TableDataI {
    settings: SettingsI;
    warningMessage?: string;
    properties: TablePropertiesI;
    displayedColumns: Array<any>;
    dataSource: MatTableDataSource<Array<any>>;
}

export class SettingsI {
    currencyType?: 'inHeader' | 'inRow' | 'combine' | null | string;
    indicator?: 'minus' | 'brackets' | null;
    currency?: string;
    sortDirection: 'asc' | 'desc';
    sortColumnName: string;
}

// export class pagginationDataI {
//     details: TableDetailsI = new Object() as TableDetailsI;
//     isServerSide: boolean = false;
//     itemsPerPage: number = 10;
//     currentPage: number = 1;
//     maxPages: number = 1;
// }

export class TableDetailsI {
    currency: string;
    currencyType: string;
    dataSorting: {
        column: string;
        descending: boolean;
    };
    pageSize: number;
    rowCount: number;
    pageCount: number;
    currentPage: number;
    firstRowOnPage: number;
    lastRowOnPage: number;
    allExpanded: boolean;
    allSelected: boolean;
}
