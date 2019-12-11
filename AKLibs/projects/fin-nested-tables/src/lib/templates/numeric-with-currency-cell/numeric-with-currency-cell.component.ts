import { Component, Input } from '@angular/core';

@Component({
  selector: 'ak-numeric-with-currency-cell',
  templateUrl: './numeric-with-currency-cell.component.html',
  styleUrls: []
})
export class NumericWithCurrencyCellComponent {
  @Input() num = 0;
  @Input() col = '';
  @Input() currency: string;
  @Input() indicator: string;
  @Input() currencyType: string;
}
