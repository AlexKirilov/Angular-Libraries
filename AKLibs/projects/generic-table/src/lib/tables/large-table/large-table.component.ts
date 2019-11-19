import { Component, Input, ViewChild, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, Sort } from '@angular/material';
import { TablePropertiesI, SettingsI } from '../../generic-table.interface';
import { distinctUntilChanged } from 'rxjs/operators';
import { Unsubscribable } from 'rxjs/internal/types';

@Component({
  selector: 'ak-large-table',
  templateUrl: './large-table.component.html',
  styleUrls: ['./large-table.component.scss']
})
export class LargeTableComponent implements OnChanges, OnDestroy {

  @Input() settings: SettingsI;
  @Input() properties: TablePropertiesI;
  @Input() displayedColumns: Array<any> = [''];
  @Input() dataSource = new MatTableDataSource([]);

  @Output() checkRow = new EventEmitter<any>();
  @Output() sortingChanged = new EventEmitter<any>();
  // @Output() paginationChanged = new EventEmitter<any>();

  @Output() selectRowReq = new EventEmitter<any>();
  @Output() rowControlBTNs = new EventEmitter<any>(); // missing in html
  @Output() selectAllRecordsReq = new EventEmitter<boolean>();
  @Output() inputDataChanged = new EventEmitter<any>();

  // @Output() onTableEventError = new EventEmitter<any>();

  @ViewChild(MatSort, {static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true }) paginator: MatPaginator; // Only for clientSide pagination

  public selectedRecord: any; // if row is selected and data or styling need to be modified any how!

  public fullDate = false; // Move to parent
  public cbSelectAll = false;
  public clickableRows = false;
  public tableColumnNames: object = {};
  public isServerSide = false;  // Move to parent --> this.serverPagging

  public leftSideArr: Array<string> = [''];
  public inputFields: Array<string> = [''];
  public columnsWithToolTip: Array<string> = [''];
  public dateTransformNames: Array<string> = [''];
  public numberCorrectionList: Array<string> = [''];

  private unscSort: Unsubscribable;
  private unscPaginator: Unsubscribable;

  ngOnDestroy(): void {
    if (this.unscSort) { this.unscSort.unsubscribe(); }
    if (this.unscPaginator) { this.unscPaginator.unsubscribe(); }
  }

  ngOnChanges(): void {
    if (this.properties) { this.onDataUpdate(); }
  }

  onDataUpdate() {
    try {
      this.fullDate = this.properties.fullDate || false;
      this.cbSelectAll = this.properties.cbSelectAll || false;
      this.clickableRows = this.properties.clickableRows || false;
      this.isServerSide = this.properties.isServerPagging || false;
      this.tableColumnNames = this.properties.tableColumnNames;

      this.inputFields = this.properties.inputfields || [''];
      this.columnsWithToolTip = this.properties.columnsWithToolTip || [''];
      this.dateTransformNames = this.properties.dateTransformNames || [''];
      this.numberCorrectionList = this.properties.numberCorrectionList || [''];
      if (this.isServerSide) {
        this.paginator.pageSize = this.dataSource.data.length;
      }

    } catch (err) {
      console.warn('The table income data is corrupted, please, provide validated data.', err);
    }

    if (this.isServerSide && !this.unscSort) {
      this.serverSideTable();

      this.sort.direction = this.settings ? this.settings.sortDirection : 'asc';
      this.sort.active = this.settings ? this.settings.sortColumnName : '';
    } else { this.defaultTableFunc(); }
  }

  defaultTableFunc() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  serverSideTable() {
    this.unscSort = this.sort.sortChange.pipe(distinctUntilChanged())
      .subscribe((sort: Sort) => this.sortingChanged.emit(sort));

    // // server side default pagination component
    // this.unscPaginator = this.paginator.page.pipe(distinctUntilChanged())
    //   .subscribe((pag: PageEvent) => this.paginationChanged.emit(pag));
  }


  // Select / Deselect all records checkboxes
  selectAllRecords(): void {
    if (this.isServerSide) {
      this.selectAllRecordsReq.emit(this.cbSelectAll);
    } else {
      // Client Side - Select/ Unselect all records
      this.dataSource.data.forEach(row => {
        if (row.checkboxData && !row.checkboxData.select) {
          row.checkboxData.select = this.cbSelectAll;
        }
      });
    }
  }

  // On row selection, when the properties is set to true;
  selectRow(row: any): void {
    if (this.clickableRows) {
      this.selectRowReq.emit(row);
    }
  }


  // controll options
  editRecord($event: any) { this.selectedRecord = $event.id; }
  saveRecord($event: any) { this.rowControlBTNs.emit({ button: 'save', row: $event }); }
  removeRecord($event: any) { this.rowControlBTNs.emit({ button: 'remove', row: $event }); }

  checkRowReq($row: any) { this.checkRow.emit($row); }
  changeInputData($row: any, $col: any) { this.inputDataChanged.emit({ row: $row, col: $col }); }

}
