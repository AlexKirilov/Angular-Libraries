import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { GetDataService } from '../../Data/get-data.service';

import { NTDataI, NTDetails, NTSettingsI, NTPropertiesI } from 'projects/fin-nested-tables/src/public-api';
import { take, map } from 'rxjs/operators';
import { nestedTableColumns, TableColumnNames } from '../../Data/defaultTableSettings';
import { ServerPagginationI } from 'fin-nested-tables/public-api';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';


const $clientRefDef = 279865;
const $isServerPaggingDef = false;
const $sortColumnByDef = 'security';
const $sortDirectionDef = false;
const $defCurrency = 'GBP';

@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.scss']
})
export class NestedTableComponent implements OnInit {

  tableData: Observable<NTDataI>;
  tDetails: Observable<NTDetails>;
  tSettings: Observable<NTSettingsI>;
  tProperties: Observable<NTPropertiesI>;
  tCurrency: string = $defCurrency;

  isServerPagging: boolean = $isServerPaggingDef;
  currentPage = 1;
  itemsPerPage = 25;
  sortColumnBy: string = $sortColumnByDef;
  sortDirection: boolean = $sortDirectionDef;

  public currencyType: 'inHeader' | 'inRow' | 'combine' = null;
  public currencyIndicator: 'minus' | 'brackets' = 'minus';
  public isFullDate = false;
  public isCustomisable = false;

  private page = 1;
  private perPage = 15;
  private sortName = '';
  private direction = 'desc';

  constructor(
    private data: GetDataService,
    private datastore: DatastoreService,
    private datashare: DatashareService,
  ) {
    this.datastore.pageIs = of('nested');
  }

  ngOnInit() {
    this.setTableDefParams();
    this.onInitLoadData();
  }

  onInitLoadData() {
    this.getData(this.page, this.perPage, this.sortName, this.direction as 'asc' | 'desc');
  }
  getData(page: number, perPage: number, sortName: string, direction: 'asc' | 'desc'): void {
    this.tableData = this.data.getData(page, perPage, sortName, direction).pipe(take(1), map(res => res));
  }

  setTableDefParams() {
    this.setTableDetails();
    this.setTableSettings();
    this.setTableProperties();
  }

  setTableSettings() {
    const settings = new Object() as NTSettingsI;
    settings.fullDate = this.isFullDate;
    settings.customizable = this.isCustomisable;
    settings.cbSelectAll = false;
    settings.isServerSide = this.isServerPagging;
    settings.indicator = this.currencyIndicator;
    settings.currencyType = this.currencyType;
    settings.allExpanded = false;
    settings.noDataMSG = 'No Data';
    this.tSettings = of(settings);

    if (!this.isServerPagging) { this.onInitLoadData(); }
  }

  setTableProperties(newColumns?: Array<string[]>) {
    const properties = new Object() as NTPropertiesI;
    properties.tableColumnNames = TableColumnNames;

    properties.inputFields = [['disposal', 'proceeds']];

    properties.displayedColumns = newColumns || nestedTableColumns;
    properties.percentageList = ['gainPrc'];
    properties.columnsWithToolTip = ['security'];
    properties.dateTransformNames = ['acqDate'];
    properties.numberCorrectionList = ['expense', 'indexation', 'gainLoss', 'chargeableGain', 'price'];
    properties.stickyVerColumnsList = ['expand', 'selected'];
    properties.skipColumns = [];

    this.tProperties = of(properties);
  }

  setTableDetails() {
    const details = new Object() as NTDetails;
    details.currency = this.tCurrency;
    details.tableName = 'WifClients';
    details.isNested = true;
    details.rowIDName = ['securityRef'];
    details.nestedPropertyName = ['assets'];
    this.tDetails = of(details);
  }

  insureHasSelect(data: Array<any>): Array<any> {
    return data.filter((row: any) => {
      row.selected = (row.selected || false);
      return true;
    });
  }

  insureHasExpanded(data: Array<any>): Array<any> {
    return data.filter((el: any) => {
      el.expanded = false;
      return true;
    });
  }

  toggleDataLoad(isServerPagging: boolean) {
    this.isServerPagging = isServerPagging;
    this.setTableSettings();
  }

  getServerPageData($event: ServerPagginationI) {
    this.currentPage = $event.page;
    this.itemsPerPage = $event.itemsPerPage;
    this.onInitLoadData();
  }

  sortingChanged($event: any) {
    this.sortColumnBy = $event.direction !== '' ? $event.active || $event.col : $sortColumnByDef;
    this.sortDirection = $event.direction === 'asc' || $event.direction === '' ? false : true;
    this.onInitLoadData();
  }

  changeCurrencyType(type: 'inHeader' | 'inRow' | 'combine'): void {
    this.currencyType = type;
    this.setTableSettings();
  }

  changeCurrencyIndicator(mode: 'minus' | 'brackets'): void {
    this.currencyIndicator = mode;
    this.setTableSettings();
  }

  updateCurrency(currency: string): void {
    this.tCurrency = currency;
    this.setTableDetails();
  }

  toggleDateType(dateType: boolean) {
    this.isFullDate = dateType;
    this.setTableSettings();
  }

  toggleCustomisable(is: boolean) {
    this.isCustomisable = is;
    this.setTableSettings();
  }

  tableCustomization($tableColumns: Array<Array<any>>) {
    // // Data need to be prepared before sending and it should follow this interface FullDataListColumnLayerDataI => tables: Array<Array<LayerI>>;
    // let tmp: FullDataListColumnLayerDataI = {
    //   tables: WifClients,
    //   tableName: 'WifClients'
    // }
    // this.customiseServicePopUp.openTableCustomisation(tmp, (res: any) => {
    //   if (res && res.data && res.data.tables)
    //     this.setTableProperties(this.TcontrolService.convertToArrayOfStrings(res.data.tables));
    // });
  }

  updateTableRowData($row: any): void {
    console.log('updateTableRowData', $row);
  }

  selectDeselectAll($bool: boolean): void {
    console.log('selectDeselectAll', $bool);
  }

  expandCollapsAll($bool: boolean): void {
    console.log('expandCollapsAll', $bool);
  }

  changeInputData($row: any): void {
    console.log('changeInputData', $row);
  }

  tableCTRLBTNRow($btnEvent: any): void {
    console.log('tableCTRLBTNRow', $btnEvent);
  }

  OnTableError($error: any): void {
    console.log('OnTableError', $error);
  }

}
