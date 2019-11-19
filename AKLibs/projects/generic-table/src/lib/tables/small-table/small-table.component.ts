import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { SettingsI, TablePropertiesI } from '../../generic-table.interface';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Unsubscribable } from 'rxjs';
import { GTableService } from '../../generic-table.service';

@Component({
  selector: 'ak-small-table',
  templateUrl: './small-table.component.html',
  styleUrls: ['./small-table.component.scss']
})
export class SmallTableComponent implements OnChanges, OnDestroy {

  @Input() settings: SettingsI;
  @Input() properties: TablePropertiesI;
  @Input() displayedColumns: Array<any> = [''];
  @Input() dataSource = new MatTableDataSource([]);

  @Output() checkRow = new EventEmitter<any>();
  @Output() sortingChanged = new EventEmitter<any>();

  @Output() selectRowReq = new EventEmitter<any>();
  @Output() rowControlBTNs = new EventEmitter<any>(); // missing in html
  @Output() selectAllRecordsReq = new EventEmitter<boolean>();
  @Output() inputDataChanged = new EventEmitter<any>();

  @Output() sortColumnBy = new EventEmitter<any>();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; // Only for clientSide pagination

  public selectedRecord: any; // if row is selected and data or styling need to be modified any how!

  public fullDate = false; // Move to parent
  public cbSelectAll = false;
  public clickableRows = false;
  public isServerSide = false;  // Move to parent --> this.serverPagging

  public sortBy: Array<string> = [];
  public leftSideArr: Array<string> = [];
  public inputFields: Array<string> = [];
  public columnsWithToolTip: Array<string> = [];
  public dateTransformNames: Array<string> = [];
  public numberCorrectionList: Array<string> = [];

  public isSelected = false;
  private unscPaginator: Unsubscribable;

  public smallTableColumn = ['data1'];
  public tableColumnNames: any = {
    data1: []
  };

  public chAll = true;
  public currency = '';
  public sortColumn = '';
  public sortDirection: number; // 1 'asc';
  public originalColumnNames: any;

  constructor(
    private service: GTableService
  ) { }

  ngOnDestroy(): void {
    if (this.unscPaginator) { this.unscPaginator.unsubscribe(); }
  }

  ngOnChanges(): void {
    if (this.properties) {
      this.onDataUpdate();
    }
  }

  onDataUpdate() {
    try {
      this.fullDate = this.properties.fullDate || false;
      this.cbSelectAll = this.properties.cbSelectAll || false;
      this.clickableRows = this.properties.clickableRows || false;
      this.isServerSide = this.properties.isServerPagging || false;

      this.inputFields = this.properties.inputfields || [];
      this.columnsWithToolTip = this.properties.columnsWithToolTip || [];
      this.dateTransformNames = this.properties.dateTransformNames || [];
      this.numberCorrectionList = this.properties.numberCorrectionList || [];

      this.currency = this.properties.details ? this.properties.details.currency : '';
      this.sortColumn = this.properties.details ? this.properties.details.dataSorting.column : '';
      this.sortDirection = this.properties.details ? this.properties.details.dataSorting.descending ? -1 : 1 : 1; // 1 'asc';
      this.originalColumnNames = this.properties.tableColumnNames;

      this.sortBy = this.displayedColumns.slice();
      if (this.sortBy.indexOf('selected') !== -1) {
        this.sortBy.splice(this.sortBy.indexOf('selected'), 1);
      }
      if (this.sortBy.indexOf('warning') !== -1) {
        this.sortBy.splice(this.sortBy.indexOf('warning'), 1);
      }

      if (this.inputFields.length > 0) {
        const swap = this.displayedColumns.slice();
        this.inputFields.forEach(i => {
          swap.push(swap.splice(swap.indexOf(i), 1)[0]);
        });

        this.tableColumnNames.data1 = swap;
      } else {
        this.tableColumnNames.data1 = this.displayedColumns.slice();
      }
    } catch (err) {
      console.warn('The table income data is corrupted, please, provide validated data.', err);
    }

    if (!this.isServerSide) {
      this.dataSource.paginator = this.paginator;
    }
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
  selectRow(row: any): void { if (this.clickableRows) { this.selectRowReq.emit(row); } }

  // controll options
  editRecord($event: any) { this.selectedRecord = $event.id; }
  saveRecord($event: any) { this.rowControlBTNs.emit({ button: 'save', row: $event }); }
  removeRecord($event: any) { this.rowControlBTNs.emit({ button: 'remove', row: $event }); }

  checkRowReq($row: any) { this.checkRow.emit($row); }
  changeInputData($row: any, $col: any) { this.inputDataChanged.emit({ row: $row, col: $col }); }

  SortByColumn(col: any) { this.sortColumnBy.emit({ col, direction: this.sortDirection }); }
}
