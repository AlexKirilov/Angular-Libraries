import { Component, Input, OnChanges, Output, EventEmitter, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TablePropertiesI, TableDataI, SettingsI, PagginationDetailsI } from '../generic-table.interface';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'ak-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class GenericTableComponent implements OnChanges {

  @Input() tableData: TableDataI;

  @Output() checkRowReq = new EventEmitter<any>();
  @Output() selectRowReq = new EventEmitter<any>();
  @Output() updatePageReq = new EventEmitter<any>();
  @Output() getServerPageData = new EventEmitter<any>();
  @Output() sortingChangedReq = new EventEmitter<any>();
  @Output() selectAllRecordsReq = new EventEmitter<any>();
  @Output() selectControllerReq = new EventEmitter<any>();
  // @Output() paginationChangedReq = new EventEmitter<any>();
  // @Output() onTableEventError = new EventEmitter<any>();
  @Output() rowControlBTNPressed = new EventEmitter<any>();
  @Output() newInputFieldDatarowUpdate = new EventEmitter<any>();

  public currentPage: number;
  public settings: SettingsI;
  // All data and properties need to be set before sending the data to the component
  // Use 'TablePropertiesI' class to fill the properties data
  public properties: TablePropertiesI;
  public displayedColumns: Array<any> = [''];
  public dataSource: any = new MatTableDataSource([]);

  public isServerPagging: Observable<boolean> = of(false);
  public pagginationDetails: PagginationDetailsI;

  public displayLSize = true;
  public displayMSize = false;
  public displaySSize = false;

  // Display tables depending of the client screen size
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // To prevent building all tables and hiding them to the UI
    // It wil create only one table at once
    this.fittingTableToScreenSize(event.target.innerWidth);
  }

  constructor() {
    this.fittingTableToScreenSize(document.body.clientWidth);
  }

  fittingTableToScreenSize(innerWidth: number) {
    (innerWidth <= 1200 || document.body.offsetWidth <= 1200) ?
      (innerWidth <= 960 || document.body.offsetWidth <= 960) ?
        (this.displaySSize = true, this.displayMSize = false, this.displayLSize = false) :
        (this.displaySSize = false, this.displayMSize = true, this.displayLSize = false) :
      (this.displaySSize = false, this.displayMSize = false, this.displayLSize = true);
  }

  ngOnChanges(): void {
    // console.log('In Generic Table waiting for data: ', this.tableData);
    if (this.tableData) {
      // set default table settings
      this.settings = this.tableData.settings;
      // Update properties obj
      this.properties = this.tableData.properties;
      // Update dataSource - table data
      this.dataSource = this.tableData.dataSource;
      // Update displayedColumns - Table column names
      this.displayedColumns = this.tableData.displayedColumns;
      this.isServerPagging = of(this.tableData.properties.isServerPagging || false);
      if (this.isServerPagging) {
        this.serverSideData();
      }
    }
  }

  serverSideData() {
    this.pagginationDetails = {
      isServerSide: this.tableData.properties.isServerPagging,
      itemsPerPage: this.tableData.properties.details.pageSize,
      currentPage: this.tableData.properties.details.currentPage,
      details: this.tableData.properties.details,
      maxPages: this.tableData.properties.details.pageCount
    }
  }

  changeItemsPerPage(toItemsPerPage: number, ref?: any): void {
    this.pagginationDetails.pageSize = toItemsPerPage;
    this.currentPage = 1;
    this.updateTableData();
  }

  goToPage(toPage: number): void {
    this.currentPage = toPage;
    this.updateTableData();
  }

  updateTableData(): void {
    this.getServerPageData.emit({
      page: this.currentPage,
      itemsPerPage: this.pagginationDetails.pageSize
    });
  }

  // Paggination component
  updatePage($event: any) { debugger; this.updatePageReq.emit($event); }

  // Table Components
  checkRow($event: any) { debugger; this.checkRowReq.emit($event); }
  selectRow($event: any) { debugger; this.selectRowReq.emit($event); }
  rowControlBTNs($btn: any) { debugger; this.rowControlBTNPressed.emit($btn); }
  sortingChanged($event: any) { this.sortingChangedReq.emit($event); }
  selectAllRecords($event: any) { debugger; this.selectAllRecordsReq.emit($event); }
  selectController($event: any) { debugger; this.selectControllerReq.emit($event); }
  // paginationChanged($event: any) { debugger; this.paginationChangedReq.emit($event); }
  inputDataChanged($newInput: any) { debugger; this.newInputFieldDatarowUpdate.emit($newInput); }
}