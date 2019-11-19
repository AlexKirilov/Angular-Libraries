import { Component, OnChanges, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { SettingsI, TablePropertiesI } from '../../generic-table.interface';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { GTableService } from '../../generic-table.service';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'ak-medium-table',
  templateUrl: './medium-table.component.html',
  styleUrls: ['./medium-table.component.scss']
})
export class MediumTableComponent implements OnChanges, OnDestroy {

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

  public mediumTableColumn = ['data1', 'data2'];
  public tableColumnNames: any = {
    data1: [],
    data2: [],
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
      console.log('M Table datasource Obj ', this.dataSource);
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

      // Medium table difference data
      // Setting the sortBy list
      this.sortBy = this.displayedColumns;
      if (this.sortBy.indexOf('selected') !== -1) {
        this.sortBy.splice(this.sortBy.indexOf('selected'), 1);
        this.isSelected = true;
      }
      if (this.sortBy.indexOf('warning') !== -1) {
        this.sortBy.splice(this.sortBy.indexOf('warning'), 1);
      }
      let newInputFields = this.inputFields;
      const swap = this.displayedColumns;

      newInputFields = newInputFields.filter(input => {
        return swap.includes(input);
      });

      // Medium Table Data
      if (newInputFields.length > 0) {

        newInputFields.forEach(i => {
          swap.splice(swap.indexOf(i), 1);
        });

        this.tableColumnNames.data1 = swap;
        this.tableColumnNames.data2 = newInputFields;
      } else {
        const split = this.service.chunkArray(this.displayedColumns, 2);
        this.tableColumnNames.data1 = split[0];
        this.tableColumnNames.data2 = split[1];
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
  selectRow(row: any): void {
    if (this.clickableRows) { this.selectRowReq.emit(row); }
  }

  // controll options
  editRecord($event: any) { this.selectedRecord = $event.id; }
  saveRecord($event: any) { this.rowControlBTNs.emit({ button: 'save', row: $event }); }
  removeRecord($event: any) { this.rowControlBTNs.emit({ button: 'remove', row: $event }); }

  checkRowReq($row: any) { this.checkRow.emit($row); }
  changeInputData($row: any, $col: any) { this.inputDataChanged.emit({ row: $row, col: $col }); }

  SortByColumn(col: any) { this.sortColumnBy.emit({ col, direction: this.sortDirection }); }
}
