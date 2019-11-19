import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PagginationDetailsI } from '../generic-table.interface';
@Component({
  selector: 'ak-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css']
})
export class TablePaginatorComponent implements OnChanges {

  @Input() pagDetails: PagginationDetailsI = new Object() as PagginationDetailsI;

  @Output() changeItemsPerPage = new EventEmitter<number>();
  @Output() goToPage = new EventEmitter<number>();

  itemsPerPage = 10;
  jumptoPage: any = null;
  currentPage = 1;
  maxPages = 1;
  details = '';

  ngOnChanges(): void {
    if (this.pagDetails) {
      this.calcTablePaginationDetails();
    }

  }

  calcTablePaginationDetails() {
    this.itemsPerPage = this.pagDetails.pageSize || 10;
    this.currentPage = this.pagDetails.currentPage || 1;
    this.maxPages = this.pagDetails.pageCount || 1;

    this.maxPages = this.pagDetails.pageCount;
    const startFrom = this.pagDetails.firstRowOnPage;
    const fromTo = this.pagDetails.lastRowOnPage;
    this.details = `${startFrom} - ${fromTo} of ${this.pagDetails.rowCount} rows and ${this.currentPage} of ${this.maxPages} pages `;
  }

  validateJumpTo() {
    this.jumptoPage = (this.jumptoPage === '') ? '' :
      isNaN(this.jumptoPage) ? this.jumptoPage = this.currentPage :
        (this.jumptoPage > this.maxPages) ? this.maxPages :
          (this.jumptoPage < 1) ? 1 : this.jumptoPage;
  }

  jumpToPage() {
    this.validateJumpTo();
    if (!isNaN(this.jumptoPage) && this.jumptoPage !== '') {
      this.goToPage.emit(this.jumptoPage);
    }
  }

  changeItemsPerPageTable($event: any) {
    this.changeItemsPerPage.emit($event.value);
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.goToPage.emit(this.currentPage);
  }

  goToPrevPage() {
    (this.currentPage > 0) ? --this.currentPage : this.currentPage = 1;
    this.goToPage.emit(this.currentPage);
  }

  goToNextPage() {
    (this.currentPage < this.maxPages) ? ++this.currentPage : this.currentPage = this.maxPages;
    this.goToPage.emit(this.currentPage);
  }

  goToLastPage() {
    this.currentPage = this.maxPages;
    this.goToPage.emit(this.currentPage);
  }
}
