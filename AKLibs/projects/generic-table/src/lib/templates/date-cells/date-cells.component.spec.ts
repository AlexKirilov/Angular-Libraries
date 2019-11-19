import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCellsComponent } from './date-cells.component';

describe('DateCellsComponent', () => {
  let component: DateCellsComponent;
  let fixture: ComponentFixture<DateCellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateCellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
