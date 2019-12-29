import { Component, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges, ElementRef } from '@angular/core';
import { NTDataI, NTDetails, NTSettingsI, NTPropertiesI, TableCtrlBtnsI } from '../../table-interfaces';
import { Sort, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { FinNestedTablesService } from '../../fin-nested-tables.service';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { map } from 'rxjs/internal/operators/map';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { FormControl } from '@angular/forms';
import { ConnectableObservable } from 'rxjs/internal/observable/ConnectableObservable';
import { publish } from 'rxjs/internal/operators/publish';

@Component({
  selector: 'ak-large-nested-table',
  templateUrl: './large-nested-table.component.html',
  styleUrls: ['./large-nested-table.component.scss']
})
export class LargeNestedTableComponent implements OnChanges {

  @Input() NTData: NTDataI;
  @Input() NTDetails: NTDetails;
  @Input() NTSettings: NTSettingsI;
  @Input() NTProperties: NTPropertiesI;
  @Input() layerLevel = 1;
  @Input() inProgress: boolean = false;

  // @Output() getDetails = new EventEmitter<any>(); //TODO: Version 2
  @Output() sortColumnBy = new EventEmitter<Sort>();
  @Output() changeInputDataReq = new EventEmitter<any>();
  @Output() filterTableDataReq = new EventEmitter<string>();
  @Output() updateTableRowDataReq = new EventEmitter<any>();
  @Output() expandCollapsAllReq = new EventEmitter<boolean>();
  @Output() selectDeselectAllReq = new EventEmitter<boolean>();
  @Output() tableCTRLBTNRowReq = new EventEmitter<TableCtrlBtnsI>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; // Only for clientSide pagination

  public dataSource: any = new MatTableDataSource([]);
  public displayColumns: Array<any>;
  public editableRowId = false;
  public filterCtrl = new FormControl('');

  private ObservableConn: ConnectableObservable<any>;
  constructor(
    private service: FinNestedTablesService
  ) { }

  defaultTableFunc() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.NTData && this.NTDetails && this.NTSettings && this.NTProperties &&
      changes && changes.NTData && changes.NTData.currentValue && (!changes.NTData.previousValue || (
        changes.NTData.currentValue.dataSource !== changes.NTData.previousValue.dataSource
      ))
    ) {
      if (this.NTSettings.isDataFilterVisible && !this.ObservableConn) {
        this.ifFilterData();
      }
      this.onDataUpdate(changes);
    }
  }

  ifFilterData() {
    this.ObservableConn = this.filterCtrl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map((filterValue: string) => {
        if (this.NTSettings.isServerSide) {
          this.inProgress = true;
          this.filterTableDataReq.emit(filterValue.trim().toLowerCase());
        } else {
          this.dataSource.filter = filterValue.trim().toLowerCase();
        }
      })
    ).pipe(
      publish()
    ) as ConnectableObservable<any>;
    this.ObservableConn.connect();
  }

  selectAll($event: any) {
    if (this.NTSettings.isServerSide) {
      this.NTSettings.cbSelectAll = $event.checked;
      this.selectDeselectAllReq.emit($event.checked || this.NTSettings.cbSelectAll);
    }

    this.dataSource.data.forEach((row: any) => {
      if (row[this.NTDetails.nestedPropertyName[this.layerLevel - 1]].length > 0) {
        row.selected = $event.checked || this.NTSettings.cbSelectAll;
      }
    });
  }

  selectTableRow(row: any) {
    if (row) {
      row.selected = !row.selected;
      this.updateTableRowDataReq.emit({ row, type: 'selectRow', selected: row.selected, forLayer: this.layerLevel });

      if (this.NTSettings.cbSelectAll && !row.selected) {
        this.NTSettings.cbSelectAll = false;
      }
    }
  }

  onDataUpdate(changes: SimpleChanges) {
    try {
      // This function is triggered even when the user hover over the table header names
      this.dataSource.data = [...this.NTData.dataSource.data];
      this.displayColumns = this.remainingColumns([...this.NTProperties.displayedColumns[this.layerLevel - 1]]);

      if (this.NTSettings.isServerSide) {
        this.paginator.pageSize = this.dataSource.data.length;
      }

      if (this.NTSettings.isServerSide && this.NTData.details) {
        this.sort.active = this.NTData.details.sortColumnName ?
          this.NTData.details.sortColumnName[0].toLocaleLowerCase() +
          this.NTData.details.sortColumnName.substr(1) : '';
        this.sort.direction = this.NTData.details.sortDirection ?
          this.NTData.details.sortDirection : 'asc';
      } else { this.defaultTableFunc(); }
    } catch (err) {
      console.warn(`The nested table income data is corrupted, please, provide validated data for layer: ${this.layerLevel}`, err);
      throw err;
    }
  }

  expandDetails(row: any) {
    // tslint:disable-next-line: deprecation
    event.stopPropagation();
    row.expanded = !row.expanded;
    if (this.NTSettings.isServerSide) {
      this.updateTableRowDataReq.emit({ row, type: 'expandDetails', expanded: row.expanded, forLayer: this.layerLevel });
    }
  }

  toggleDetailsTable() {
    let counter = 0;
    this.NTSettings.allExpanded = !this.NTSettings.allExpanded;
    const tmp =  this.dataSource.data;
    this.dataSource.data = [];
    tmp.forEach((el: any) => {
      console.log( 'COUNTER => ', ++counter);
      if (el[this.NTDetails.nestedPropertyName[this.layerLevel - 1]].length > 0) {
        el.expanded = this.NTSettings.allExpanded;
      }
    });
    debugger
    this.dataSource.data = tmp;

    // Send to the server
    if (this.NTSettings.isServerSide) {
      this.expandCollapsAllReq.emit(this.NTSettings.allExpanded);
    }
  }

  changeInputData(row: any, col: string) {
    this.changeInputDataReq.emit({ layer: this.layerLevel, row, col });
  }

  getServerNestedPageData($event: any) {
    // TODO: Version 2
    console.log('getServerNestedPageData => ', $event);
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

  //////////////////////////////////////
  // HTML Table Row *ngIf filters

  isHeaderCurrencyShown(col: string): boolean {
    return this.NTProperties.numberCorrectionList.includes(col) &&
      (this.NTSettings.currencyType === 'combine' ||
        this.NTSettings.currencyType === 'inHeader') && col !== 'disposal';
  }

  isColSticky(col: string): boolean {
    return this.NTProperties.stickyVerColumnsList.includes(col);
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

  remainingColumns(displayedColumns: any) {
    return displayedColumns ? displayedColumns.filter((column: string) => {
      return column !== 'selected' && column !== 'expand' && column !== 'ctrl';
    }) : [];
  }


  //////////////////////////////////////////
  //// To Inner table
  sendDataToNextLayer(LayerData: Array<string>): NTDataI {
    const newData: NTDataI = new Object() as NTDataI;
    newData.dataSource = new MatTableDataSource<any>(LayerData || []);
    return newData;
  }

  sortData(sort: Sort) {
    if (
      this.NTSettings.isServerSide &&
      this.service.skipSortColmns(sort, [...this.NTProperties.skipColumns])
    ) {
      this.sortColumnBy.emit(sort);
    }
  }


  isRowExpandableIconVissible(row: any): boolean {

    if (this.NTSettings.areDetailsServerSide) return true;
    else if (this.isDetailsHasContent(row)) return true;
    else return false;
  }

  isDetailsHasContent(row: any): boolean {
    console.log(row, this.NTDetails.nestedPropertyName[this.layerLevel - 1])
    console.log(this.sendDataToNextLayer(row[this.NTDetails.nestedPropertyName[this.layerLevel - 1]]).dataSource.data.length > 0)
    return this.sendDataToNextLayer(row[this.NTDetails.nestedPropertyName[this.layerLevel - 1]]).dataSource.data.length > 0
  }
}
