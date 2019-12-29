import { SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface CustomiseErrorsI {
    type: 'error' | 'warning' | 'fatal' | 'info';
    message: string;
    errorMessage: Error | any;
}

export class NTDetails {
    currency: string;
    tableName: string;
    isNested: boolean;
    rowIDName: Array<string>;
    nestedPropertyName: Array<string>;
}

export class NTDataI {
    dataSource: MatTableDataSource<any>;
    details: NTDetailsI;
}

export class NTDetailsI {
    pageSize: number;
    rowCount: number;
    pageCount: number;
    currentPage: number;
    firstRowOnPage: number;
    lastRowOnPage: number;
    allExpanded: boolean;
    allSelected: boolean;
    sortDirection: 'asc' | 'desc';
    sortColumnName: string;
}

export class NTSettingsI {
    fullDate?: boolean;
    noDataMSG: string;
    customizable?: boolean;
    cbSelectAll?: boolean;
    allExpanded?: boolean;
    isServerSide?: boolean;
    isDataFilterVisible?: boolean;
    areDetailsServerSide?: boolean;
    pageSizeOptions?: Array<number>;
    indicator?: 'minus' | 'brackets' | null;
    currencyType?: 'inHeader' | 'inRow' | 'combine' | null;
}

export class NTPropertiesI {
    tableColumnNames: object;
    displayedColumns: Array<Array<any>>;
    skipColumns?: Array<string>;
    leftSideArr?: Array<string>;
    inputFields?: Array<Array<string>>;
    percentageList?: Array<string>;
    columnsWithToolTip?: Array<string>;
    dateTransformNames?: Array<string>;
    numberCorrectionList?: Array<string>;
    stickyVerColumnsList?: Array<string>;
}

export class PagginationDataI {
    isServerSide: boolean;
    itemsPerPage: number;
    currentPage: number;
    maxPages: number;
}

export class SortColumnI {
    col: string;
    direction: SortDirection;
}

export class ServerPagginationI {
    page: number;
    itemsPerPage: number;
}

export class TableCtrlBtnsI {
    button: 'save' | 'edit' | 'remove' | string;
    row: any;
}
