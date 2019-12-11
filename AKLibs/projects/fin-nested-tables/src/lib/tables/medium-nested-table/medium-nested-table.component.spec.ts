import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumNestedTableComponent } from './medium-nested-table.component';

describe('MediumNestedTableComponent', () => {
  let component: MediumNestedTableComponent;
  let fixture: ComponentFixture<MediumNestedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumNestedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumNestedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
