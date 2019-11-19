import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnCustomiserComponent } from './table-column-customiser.component';

describe('TableColumnCustomiserComponent', () => {
  let component: TableColumnCustomiserComponent;
  let fixture: ComponentFixture<TableColumnCustomiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableColumnCustomiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnCustomiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
