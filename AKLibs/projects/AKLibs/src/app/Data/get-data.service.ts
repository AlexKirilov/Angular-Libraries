import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { nestedTableData, TableDataI } from './defaultTableData';

import { NTDataI, NTDetailsI } from 'fin-nested-tables';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  public async getData(page: number, perPage: number, sortName: string, direction: 'asc' | 'desc', isServerPagging: boolean): Promise<Observable<NTDataI>> {
    let res: TableDataI[] = [];
    const data = nestedTableData.filter(r => r);

    // Sort data
    if (sortName && sortName !== '' && direction) {
      data.sort((a, b) => a[sortName] < b[sortName] ? -1 : a[sortName] > b[sortName] ? 1 : 0);
      if (direction === 'desc') {
        data.reverse();
      }
    }

    if (isServerPagging) {
      // Grab data per page;
      if (page >= 1 && perPage && perPage > 1) {
        const start = (page - 1) * perPage;
        const end = page * perPage;
        // res = data.splice(start, end);
        let counter = -1;
        res = data.filter(r => {
          ++counter;
          if (counter > start && counter <= end)
            return true;
          return false;
        });
      } else {
        res = data;
      }
    } else res = data;

    const size = nestedTableData.length as number;

    const tmp = new Object() as NTDataI;
    tmp.dataSource = new MatTableDataSource<any>(res)

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

    await this.delay(3000);
    return of(tmp);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
