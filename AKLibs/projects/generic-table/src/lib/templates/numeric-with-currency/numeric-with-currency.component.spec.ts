import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericWithCurrencyComponent } from './numeric-with-currency.component';

describe('NumericWithCurrencyComponent', () => {
  let component: NumericWithCurrencyComponent;
  let fixture: ComponentFixture<NumericWithCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericWithCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericWithCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
