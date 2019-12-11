import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ak-table-control-btns',
  templateUrl: './table-control-btns.component.html',
  styleUrls: []
})
export class TableControlBtnsComponent {

  @Input() row: any;
  @Input() rowIDName: string;
  @Input() editableRowId: string;

  @Output() editRowReq = new EventEmitter<any>();
  @Output() saveRowReq = new EventEmitter<any>();
  @Output() removeRowReq = new EventEmitter<any>();

  editRow(row: any) { this.editRowReq.emit(row); }
  saveRow(row: any) { this.saveRowReq.emit(row); }
  removeRow(row: any) { this.removeRowReq.emit(row); }
}
