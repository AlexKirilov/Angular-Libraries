import { Injectable } from '@angular/core';
import { Sort } from '@angular/material';
import { NTDetailsI, PagginationDataI } from './table-interfaces';

@Injectable({
  providedIn: 'root'
})
export class FinNestedTablesService {

  constructor() { }

  serverSidePaggDetails(details: NTDetailsI): PagginationDataI {
    return {
      isServerSide: true,
      itemsPerPage: details.pageSize,
      currentPage: details.currentPage,
      maxPages: details.pageCount
    };
  }

  skipSortColmns($event: Sort, arrSkip: Array<string> = []): boolean {
    return !arrSkip.includes($event.active);
  }

  checkArrayOfArrays(a: any) {
    return a.every((x: any) => Array.isArray(x));
  }

  chunkArray(arr: Array<string> | Array<string[]>, n: number, inputFiedls: number = 0) {
    if (this.checkArrayOfArrays(arr)) { arr = arr[0] as any; }
    const chunkLength = Math.max(arr.length / n, 1) + inputFiedls;
    return [
      arr.slice(0, chunkLength),
      arr.slice(chunkLength, arr.length)
    ];
  }

  toJSONstring(obj: any): string {
    return JSON.stringify(obj);
  }

  isInputValueChange(data: any): boolean {
    if (data && data.currentValue) {
      if (data.currentValue.dataSource && data.currentValue.dataSource.data) {
        if (data.previousValue) {
          return this.toJSONstring(data.currentValue.dataSource.data) !== (data.previousValue.dataSource.data)
        } else {
          return true;
        }
      } else {
        return (this.toJSONstring(data.currentValue) !== (data.previousValue ? this.toJSONstring(data.previousValue) : null));
      }
    }
    
  }

  validateIncomeData(arr: Array<any>): boolean {
    const err = [];
    arr.forEach(prop => {
      if (!this.isInputValueChange(prop)) {
        err.push(prop);
      }
    });
    return err.length < arr.length;
  }

}
