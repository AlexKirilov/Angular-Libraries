import { Component, OnChanges, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { FinNestedTablesService } from '../fin-nested-tables.service';
import {
  NTDataI,
  NTDetails,
  NTSettingsI,
  NTPropertiesI,
  PagginationDataI,
  CustomiseErrorsI,
  ServerPagginationI,
} from '../table-interfaces';

@Component({
  selector: 'ak-fin-nested-tables',
  templateUrl: './fin-nested-tables.component.html',
  styleUrls: ['./fin-nested-tables.component.scss']
})
export class FinNestedTablesComponent implements OnChanges {

  // Outside income data
  @Input() NTData: NTDataI; // TODO: modfied to accept next layer data
  @Input() NTDetails: NTDetails;
  @Input() NTSettings: NTSettingsI;
  @Input() NTProperties: NTPropertiesI;

  // Internal income data
  @Input() layer = 1;
  @Input() nestedTableDetails: any = [];

  @Output() OnError = new EventEmitter<CustomiseErrorsI>();

  @Output() getServerPageData = new EventEmitter<ServerPagginationI>();
  @Output() tableCustomization = new EventEmitter<Array<Array<any>>>();
  @Output() selectDeselectAll = new EventEmitter<boolean>();
  @Output() expandCollapsAll = new EventEmitter<boolean>();
  @Output() updateTableRowData = new EventEmitter<any>();
  @Output() filterTableData = new EventEmitter<string>();
  @Output() changeInputData = new EventEmitter<any>();
  @Output() tableCTRLBTNRow = new EventEmitter<any>();
  @Output() sortColumnBy = new EventEmitter<any>();

  public pagginationDetails: PagginationDataI;

  // Settings
  public isServerSide: boolean;
  public isTableCustomizable: boolean;

  // Inner properties with default values
  public displayLSize = true;
  public displayMSize = false;
  public displaySSize = false;

  public inProgress = false;
  public isCustomise = false;

  fittingTableToScreenSize(innerWidth: number) {
    (innerWidth <= 1280 || document.body.offsetWidth <= 1280) ?
      (innerWidth <= 960 || document.body.offsetWidth <= 960) ?
        (this.displaySSize = true, this.displayMSize = false, this.displayLSize = false) :
        (this.displaySSize = false, this.displayMSize = true, this.displayLSize = false) :
      (this.displaySSize = false, this.displayMSize = false, this.displayLSize = true);
  }

  // Display tables depending of the client screen size
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // To prevent building all tables and hiding them to the UI
    // It wil create only one table at once
    this.fittingTableToScreenSize(event.target.innerWidth);
  }

  constructor(
    private service: FinNestedTablesService
  ) {
    this.fittingTableToScreenSize(document.body.clientWidth);
  }

  onError(type: 'error' | 'warning' | 'fatal' | 'info', message: string, errorMessage: Error | any) {
    this.OnError.emit({ type, message, errorMessage });
  }

  ngOnChanges() {
    if (this.NTData && this.NTSettings && this.NTProperties) {
      if (this.NTDetails && this.NTDetails.rowIDName && this.NTDetails.nestedPropertyName) {

        // Hide Progress Bar
        this.inProgress = false;

        // Insure skipping columns to skip
        // expand, selected, ctrl and warning columns
        this.insureSkipSortingColumns();

        // Set all pagination details
        this.pagginationDetails = this.service.serverSidePaggDetails(this.NTData.details);

        if (!this.NTSettings.pageSizeOptions)
          this.NTSettings.pageSizeOptions = [5, 10, 25, 50];

        // Set necessary Settings
        this.isServerSide = this.NTSettings.isServerSide || false;
        this.isTableCustomizable = this.NTSettings.customizable || false;
      } else {
        this.onError('error', `Need to be provide the following data =>
        ${ this.NTDetails && !this.NTDetails.rowIDName ?
            'NTRowIDName is undefined' : ''};
        ${ this.NTDetails && !this.NTDetails.nestedPropertyName ?
            'NTDetailsPropertyName is undefined' : ''};`, null);
      }
    }
  }

  insureSkipSortingColumns() {
    if (!this.NTProperties.skipColumns.includes('selected')) { this.NTProperties.skipColumns.unshift('selected'); }
    if (!this.NTProperties.skipColumns.includes('expand')) { this.NTProperties.skipColumns.unshift('expand'); }
    if (!this.NTProperties.skipColumns.includes('ctrl')) { this.NTProperties.skipColumns.unshift('ctrl'); }
  }

  ///////////////////////////////////////
  //// Pagination Functions

  changeItemsPerPage(toItemsPerPage: number, layer?: any): void {
    this.updateTablePagginationData(1, toItemsPerPage);
  }

  goToPage(toPage: number): void {
    this.updateTablePagginationData(toPage, this.NTData.details.pageSize);
  }

  //////////////////////////////////////
  // Output Functions

  updateTablePagginationData(page: number, itemsPerPage: number): void {
    if (this.NTSettings.isServerSide)
      this.inProgress = true;
    this.getServerPageData.emit({ page, itemsPerPage });
  }

  triggerCustomization(): void {
    this.tableCustomization.emit(this.NTProperties.displayedColumns);
  }

  selectDeselectAllReq($bool: boolean): void {
    this.selectDeselectAll.emit($bool);
  }

  expandCollapsAllReq($bool: boolean): void {
    if (this.NTSettings.isServerSide)
      this.inProgress = true;
    this.expandCollapsAll.emit($bool);
  }

  updateTableRowDataReq($event: any): void {
    if (this.NTSettings.isServerSide &&
      (!$event.row[this.NTDetails.rowIDName[this.layer - 1]] && $event.row[this.NTDetails.rowIDName[this.layer - 1]].lenght == 0)
    )
      this.inProgress = true;
    this.updateTableRowData.emit($event);
  }

  changeInputDataReq($newInputRowData: any): void {
    this.changeInputData.emit($newInputRowData);
  }

  tableCTRLBTNRowReq($btnEvent: any): void {
    this.tableCTRLBTNRow.emit($btnEvent);
  }

  sortColumn(newSort: Sort): void {
    if (this.service.skipSortColmns(newSort, this.NTProperties.skipColumns)) {
      if (this.NTSettings.isServerSide)
        this.inProgress = true;
      this.sortColumnBy.emit(newSort);
    }
  }

  filterTableDataReq(filterValue: string) {
    this.filterTableData.emit(filterValue);
  }

}
