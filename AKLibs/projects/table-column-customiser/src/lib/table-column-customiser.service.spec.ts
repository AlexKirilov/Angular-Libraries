import { TestBed } from '@angular/core/testing';

import { TableColumnCustomiserService } from './table-column-customiser.service';

describe('TableColumnCustomiserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableColumnCustomiserService = TestBed.get(TableColumnCustomiserService);
    expect(service).toBeTruthy();
  });
});
