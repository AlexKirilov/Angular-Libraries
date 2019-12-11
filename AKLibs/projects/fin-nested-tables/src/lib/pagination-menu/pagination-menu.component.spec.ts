import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationMenuComponent } from './pagination-menu.component';

describe('PaginationMenuComponent', () => {
  let component: PaginationMenuComponent;
  let fixture: ComponentFixture<PaginationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
