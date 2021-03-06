import { Component, Input } from '@angular/core';

@Component({
  selector: 'ak-date-cells',
  templateUrl: './date-cells.component.html',
  styleUrls: ['./date-cells.component.css']
})
export class DateCellsComponent {

  @Input() isFullDate = false;
  @Input() colName: string;
  @Input() cellId: any;
  @Input() date: Date;

}
