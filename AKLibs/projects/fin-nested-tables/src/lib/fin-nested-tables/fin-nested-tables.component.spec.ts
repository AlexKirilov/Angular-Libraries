import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinNestedTablesComponent } from './fin-nested-tables.component';

describe('FinNestedTablesComponent', () => {
  let component: FinNestedTablesComponent;
  let fixture: ComponentFixture<FinNestedTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinNestedTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinNestedTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
