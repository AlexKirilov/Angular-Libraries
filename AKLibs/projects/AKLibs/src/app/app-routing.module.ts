import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MsgHandlerComponent } from './pages/msg-handler/msg-handler.component';
import { NestedTableComponent } from './pages/nested-table/nested-table.component';
import { GenericTableComponent } from './pages/generic-table/generic-table.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'handler' },
  { path: 'handler', component: MsgHandlerComponent },
  { path: 'nested', component: NestedTableComponent },
  { path: 'gTables', component: GenericTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
