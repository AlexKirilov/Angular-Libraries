import { TestBed } from '@angular/core/testing';

import { FinNestedTablesService } from './fin-nested-tables.service';

describe('FinNestedTablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinNestedTablesService = TestBed.get(FinNestedTablesService);
    expect(service).toBeTruthy();
  });
});
