import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallNestedTableComponent } from './small-nested-table.component';

describe('SmallNestedTableComponent', () => {
  let component: SmallNestedTableComponent;
  let fixture: ComponentFixture<SmallNestedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallNestedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallNestedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
