import { Component, OnChanges, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { NTDataI, NTDetails, NTSettingsI, NTPropertiesI, TableCtrlBtnsI } from '../../table-interfaces';
import { Sort, MatPaginator, MatTableDataSource } from '@angular/material';
import { FinNestedTablesService } from '../../fin-nested-tables.service';

@Component({
  selector: 'ak-medium-nested-table',
  templateUrl: './medium-nested-table.component.html',
  styleUrls: ['./medium-nested-table.component.scss']
})
export class MediumNestedTableComponent implements OnChanges {

  @Input() NTData: NTDataI;
  @Input() NTDetails: NTDetails;
  @Input() NTSettings: NTSettingsI;
  @Input() NTProperties: NTPropertiesI;
  @Input() layerLevel: number = 1;

  // @Output() getDetails = new EventEmitter<any>(); //TODO: Version 2
  @Output() Error = new EventEmitter<any>();
  @Output() sortColumnBy = new EventEmitter<Sort>();
  @Output() changeInputDataReq = new EventEmitter<any>();
  @Output() updateTableRowDataReq = new EventEmitter<any>();
  @Output() expandCollapsAllReq = new EventEmitter<boolean>();
  @Output() selectDeselectAllReq = new EventEmitter<boolean>();
  @Output() tableCTRLBTNRowReq = new EventEmitter<TableCtrlBtnsI>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; // Only for clientSide pagination

  public dataSource: any = new MatTableDataSource([]);
  public displayedColumns: Array<Array<any>> = [];
  public editableRowId = false;

  public sortColumn = '';
  public isSelected = false;
  public sortDirection: number; // 1 'asc';
  public originalColumnNames: any;
  public sortBy: Array<string> = [];

  public mediumTableColumn = ['ctrls', 'data1', 'data2'];
  public tableColumnNames: any = {
    ctrls: [],
    data1: [],
    data2: [],
  };

  constructor(private service: FinNestedTablesService) { }

  onError(err: any): void {
    this.Error.emit(err);
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.NTData && this.NTDetails && this.NTSettings && this.NTProperties &&
      this.service.validateIncomeData([change.NTData, change.NTDetails, change.NTSettings, change.NTProperties])
    ) {
      this.onDataUpdate();
    } else { return 0; }
  }

  onDataUpdate() {
    try {
      this.sortColumn = this.NTData.details && this.NTData.details.sortColumnName ?
        this.NTData.details.sortColumnName[0].toLocaleLowerCase() +
        this.NTData.details.sortColumnName.substr(1) : '';
      this.sortDirection = this.NTData.details && this.NTData.details.sortDirection ?
        this.NTData.details.sortDirection === 'desc' ? -1 : 1 : 1; // 1 'asc';
      this.originalColumnNames = this.NTProperties.tableColumnNames;

      // Setting up the columns Array that need to be display
      let counter = 0;
      this.NTProperties.displayedColumns.forEach((colArr: Array<string>) => {

        colArr = colArr.filter((col: string) => {
          if (col === 'expand' || col === 'selected' || col === 'ctrl') {
            this.tableColumnNames.ctrls.push(col);
            if (col === 'selected') { this.isSelected = true; }
          } else { return col; }
        });

        this.displayedColumns[counter] = colArr;
        ++counter;
      });

      // Setting the sortBy list
      this.sortBy = [...this.displayedColumns[this.layerLevel - 1]];
      if (this.sortBy.indexOf('warning') !== -1) {
        this.sortBy.splice(this.sortBy.indexOf('warning'), 1);
      }

      // Spliting the Column Array into to 2 columns
      const split = this.service.chunkArray([...this.displayedColumns[this.layerLevel - 1]], 2, this.NTProperties.inputFields.length * 2);
      this.tableColumnNames.data1 = split[0];
      this.tableColumnNames.data2 = split[1];

      if (this.NTSettings.isServerSide) {
        this.paginator.pageSize = this.dataSource.data.length;
      } else {
        this.dataSource.paginator = this.paginator;
      }

      this.dataSource.data = [...this.NTData.dataSource];
    } catch (err) {
      console.warn('The table income data is corrupted, please, provide validated data.', err);
    }
  }

  changeInputData(row: any, col: string) {
    this.changeInputDataReq.emit({ layer: this.layerLevel, row, col });
  }

  removeRecord($event: any): void {
    this.tableCTRLBTNRowReq.emit({ button: 'remove', row: $event });
  }

  editRecord($event: any): void {
    this.editableRowId = $event[this.NTDetails.rowIDName[this.layerLevel - 1]];
    this.tableCTRLBTNRowReq.emit({ button: 'edit', row: $event });
  }

  saveRecord($event: any): void {
    this.editableRowId = null;
    this.tableCTRLBTNRowReq.emit({ button: 'save', row: $event });
  }

  selectAll($event: any) {
    if (this.NTSettings.isServerSide) {
      this.NTSettings.cbSelectAll = $event.checked;
      this.selectDeselectAllReq.emit($event.checked || this.NTSettings.cbSelectAll);
    }

    this.dataSource.data.forEach((row: any) => {
      row.selected = $event.checked || this.NTSettings.cbSelectAll;
    });
  }

  selectTableRow(row: any) {
    if (row) {
      row.selected = !row.selected;
      this.updateTableRowDataReq.emit(row);

      if (this.NTSettings.cbSelectAll && !row.selected) {
        this.NTSettings.cbSelectAll = false;
      }
    }
  }

  SortByColumn(col: any) {
    if (this.NTSettings.isServerSide) {
      this.sortColumnBy.emit({ active: col, direction: -this.sortDirection === -1 ? 'desc' : 'asc' });
    } else { // Client Side sorting
      this.ClientSideSorting(col);
    }
  }

  ClientSideSorting(col: string) {
    const newData = this.dataSource.data.slice();
    newData.sort((a, b) => (a[col] > b[col] ? 1 : -1));
    if (this.sortDirection === -1) { newData.reverse(); }

    this.sortColumn = col;
    this.sortDirection = -this.sortDirection;
    this.dataSource.data = newData;
  }

  toggleDetailsTable() {
    try {
      this.NTSettings.allExpanded = !this.NTSettings.allExpanded;

      this.dataSource.data.forEach((el: any) => {
        el['expanded'] = this.NTSettings.allExpanded;
      });

      // Send to the server
      if (this.NTSettings.isServerSide) {
        this.expandCollapsAllReq.emit(this.NTSettings.allExpanded);
      }
    } catch (err) {
      throw err;
    }
  }

  expandDetails(row: any) {
    event.stopPropagation();
    row.expanded = !row.expanded;

    if (this.NTSettings.isServerSide) {
      this.updateTableRowDataReq.emit({ row, forLayer: this.layerLevel });
    }
  }

  //////////////////////////////////////
  // HTML Table Row *ngIf filters

  isHeaderCurrencyShown(col: string): boolean {
    return this.NTProperties.numberCorrectionList.includes(col) &&
      (this.NTSettings.currencyType === 'combine' ||
        this.NTSettings.currencyType === 'inHeader') && col !== 'disposal';
  }

  columnType(col: string): string {
    return '' +
      this.NTProperties.percentageList && this.NTProperties.percentageList.length && this.NTProperties.percentageList.includes(col) ? 'prc' :
      this.NTProperties.dateTransformNames && this.NTProperties.dateTransformNames.length && this.NTProperties.dateTransformNames.includes(col) ? 'dates' :
        this.NTProperties.columnsWithToolTip && this.NTProperties.columnsWithToolTip.length && this.NTProperties.columnsWithToolTip.includes(col) ? 'toolTips' :
          this.NTProperties.numberCorrectionList && this.NTProperties.numberCorrectionList.length && this.NTProperties.numberCorrectionList.includes(col) ? 'numeric' :
            this.NTProperties.inputFields && this.NTProperties.inputFields.length && this.NTProperties.inputFields[this.layerLevel - 1] && this.NTProperties.inputFields[this.layerLevel - 1].includes(col) ? 'inputs' :
              'default';
  }

  remainingColumns() {
    return this.displayedColumns[this.layerLevel - 1] ?
      this.displayedColumns[this.layerLevel - 1].filter((column: string) => {
        return column !== 'selected' && column !== 'expand' && column !== 'ctrl';
      }) : [];
  }


  //////////////////////////////////////////
  //// To Inner table
  sendDataToNextLayer(LayerData: Array<string>): NTDataI {
    const newData: NTDataI = new Object() as NTDataI;
    newData.dataSource = LayerData;
    return newData;
  }
}
