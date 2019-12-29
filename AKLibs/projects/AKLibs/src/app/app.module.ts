import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NGMaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';

import { FinNestedTablesModule } from 'fin-nested-tables';

import { AppComponent } from './app.component';
import { MsgHandlerComponent } from './pages/msg-handler/msg-handler.component';
import { NestedTableComponent } from './pages/nested-table/nested-table.component';
import { GenericTableComponent } from './pages/generic-table/generic-table.component';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NGMaterialModule,
    FlexLayoutModule,

    FinNestedTablesModule,
  ],
  declarations: [
    AppComponent,
    NestedTableComponent,
    GenericTableComponent,
    MsgHandlerComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
