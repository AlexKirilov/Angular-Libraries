import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeNestedTableComponent } from './large-nested-table.component';

describe('LargeNestedTableComponent', () => {
  let component: LargeNestedTableComponent;
  let fixture: ComponentFixture<LargeNestedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeNestedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeNestedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
