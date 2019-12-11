import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { nestedTableData, TableDataI } from './defaultTableData';

import { NTDataI, NTDetailsI } from 'fin-nested-tables';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  public getData(page: number, perPage: number, sortName: string, direction: 'asc' | 'desc'): Observable<NTDataI> {
    let res: TableDataI[] = [];
    const data = [...nestedTableData];

    // Sort data
    if (sortName && sortName !== '' && direction) {
      data.sort((a, b) => a[sortName] < b[sortName] ? -1 : a[sortName] > b[sortName] ? 1 : 0);
      if (direction === 'desc') {
        data.reverse();
      }
    }

    // Grab data per page;
    if (page >= 1 && perPage && perPage > 1) {
      const start = (page - 1) * perPage;
      const end = page * perPage;
      res = data.splice(start, end);
    } else {
      res = data.slice();
    }

    const size = nestedTableData.length as number;

    const tmp = new Object() as NTDataI;
    tmp.dataSource = data;

    tmp.details = new Object() as NTDetailsI;
    tmp.details.pageSize = perPage;
    tmp.details.rowCount = size;
    tmp.details.pageCount = Math.ceil((size / perPage) as number);
    tmp.details.currentPage = page;
    tmp.details.firstRowOnPage = (page - 1) * perPage;
    tmp.details.lastRowOnPage = page * perPage;
    tmp.details.allExpanded = false;
    tmp.details.allSelected = false;
    tmp.details.sortDirection = direction ? 'desc' : 'asc';
    tmp.details.sortColumnName = sortName;

    return of(tmp);
  }
}
