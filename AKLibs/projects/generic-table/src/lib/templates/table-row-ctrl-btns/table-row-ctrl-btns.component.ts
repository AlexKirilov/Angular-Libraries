import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ak-table-row-ctrl-btns',
  templateUrl: './table-row-ctrl-btns.component.html',
  styleUrls: ['./table-row-ctrl-btns.component.css']
})
export class TableRowCtrlBtnsComponent {

  @Input() row: any;
  @Input() editableRowId: string;

  @Output() editRowReq = new EventEmitter<any>();
  @Output() saveRowReq = new EventEmitter<any>();
  @Output() removeRowReq = new EventEmitter<any>();

  editRow(row: any) { this.editRowReq.emit(row); }
  saveRow(row: any) { this.saveRowReq.emit(row); }
  removeRow(row: any) { this.removeRowReq.emit(row); }

}
