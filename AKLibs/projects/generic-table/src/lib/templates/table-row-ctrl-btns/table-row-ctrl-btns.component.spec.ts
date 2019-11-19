import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowCtrlBtnsComponent } from './table-row-ctrl-btns.component';

describe('TableRowCtrlBtnsComponent', () => {
  let component: TableRowCtrlBtnsComponent;
  let fixture: ComponentFixture<TableRowCtrlBtnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRowCtrlBtnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowCtrlBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
