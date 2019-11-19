import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { GenericTableComponent } from './generic-table/generic-table.component';
import { TablePaginatorComponent } from './table-paginator/table-paginator.component';
import { LargeTableComponent } from './tables/large-table/large-table.component';
import { MediumTableComponent } from './tables/medium-table/medium-table.component';
import { SmallTableComponent } from './tables/small-table/small-table.component';

import { DateCellsComponent } from './templates/date-cells/date-cells.component';
import { NumericWithCurrencyComponent } from './templates/numeric-with-currency/numeric-with-currency.component';
import { TableRowCtrlBtnsComponent } from './templates/table-row-ctrl-btns/table-row-ctrl-btns.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
  ],
  declarations: [
    GenericTableComponent,
    TablePaginatorComponent,

    LargeTableComponent,
    MediumTableComponent,
    SmallTableComponent,

    DateCellsComponent,
    TableRowCtrlBtnsComponent,
    NumericWithCurrencyComponent
  ],
  exports: [GenericTableComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class GenericTableModule { }
