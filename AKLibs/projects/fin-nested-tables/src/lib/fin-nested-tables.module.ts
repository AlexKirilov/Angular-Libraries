import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NGMaterialModule } from './materail-design.module';

import { FinNestedTablesComponent } from './fin-nested-tables/fin-nested-tables.component';

import { PaginationMenuComponent } from './pagination-menu/pagination-menu.component';

import { DateCellsComponent } from './templates/date-cells/date-cells.component';
import { NumericWithCurrencyCellComponent } from './templates/numeric-with-currency-cell/numeric-with-currency-cell.component';
import { TableControlBtnsComponent } from './templates/table-control-btns/table-control-btns.component';

import { LargeNestedTableComponent } from './tables/large-nested-table/large-nested-table.component';
import { MediumNestedTableComponent } from './tables/medium-nested-table/medium-nested-table.component';
import { SmallNestedTableComponent } from './tables/small-nested-table/small-nested-table.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NGMaterialModule
  ],
  declarations: [
    FinNestedTablesComponent,

    PaginationMenuComponent,

    DateCellsComponent,
    NumericWithCurrencyCellComponent,
    TableControlBtnsComponent,

    LargeNestedTableComponent,
    MediumNestedTableComponent,
    SmallNestedTableComponent
  ],
  exports: [
    FinNestedTablesComponent
  ]

})
export class FinNestedTablesModule { }
