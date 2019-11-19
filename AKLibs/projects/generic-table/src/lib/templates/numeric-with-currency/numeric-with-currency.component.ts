import { Component, Input } from '@angular/core';

@Component({
  selector: 'ak-numeric-with-currency',
  templateUrl: './numeric-with-currency.component.html',
  styleUrls: ['./numeric-with-currency.component.css']
})
export class NumericWithCurrencyComponent {

  @Input() num = 0;
  @Input() col = '';
  @Input() currency: string;
  @Input() indicator: string;
  @Input() currencyType: string;
}
