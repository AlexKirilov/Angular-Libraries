import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NTDetailsI } from '../table-interfaces';

@Component({
  selector: 'ak-pagination-menu',
  templateUrl: './pagination-menu.component.html',
  styleUrls: ['./pagination-menu.component.scss']
})
export class PaginationMenuComponent implements OnChanges {

  @Input() isServerSide = false;
  @Input() pagginationDetails: NTDetailsI = new Object() as NTDetailsI;

  @Output() changeItemsPerPage = new EventEmitter<number>();
  @Output() goToPage = new EventEmitter<number>();

  public itemsPerPage = 10;
  public jumptoPage: any = null;
  public currentPage = 1;
  public maxPages = 1;
  public details = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.itemsPerPage = this.pagginationDetails.pageSize || 10;
    this.currentPage = this.pagginationDetails.currentPage || 1;
    this.maxPages = this.pagginationDetails.pageCount || 1;

    // Caclulate details
    this.calcTablePaginationDetails();
  }

  calcTablePaginationDetails() {
    if (this.isServerSide) { // Server Side Table
      this.maxPages = this.pagginationDetails.pageCount;
      const startFrom = this.pagginationDetails.firstRowOnPage;
      const fromTo = this.pagginationDetails.lastRowOnPage;
      this.details = `${startFrom} - ${fromTo} of ${this.pagginationDetails.rowCount} rows and ${this.currentPage} of ${this.maxPages} pages `;
    } else { // Client Side Table
      this.maxPages = Math.ceil(this.pagginationDetails.rowCount / this.itemsPerPage);
      const maxRows = this.pagginationDetails.rowCount;
      const startFrom = 1 + ((this.currentPage - 1) * this.itemsPerPage);
      const fromTo = (maxRows > (startFrom + this.itemsPerPage - 1)) ? startFrom + this.itemsPerPage - 1 : maxRows;
      this.details = `${startFrom} - ${fromTo} of ${maxRows} rows and ${this.currentPage} of ${this.maxPages} pages`;
    }

  }

  validateJumpTo() {
    this.jumptoPage = (this.jumptoPage === '') ? '' :
      isNaN(this.jumptoPage) ? this.jumptoPage = this.currentPage :
        (this.jumptoPage > this.maxPages) ? this.maxPages :
          (this.jumptoPage < 1) ? 1 : this.jumptoPage;
  }

  jumpToPage() {
    this.validateJumpTo();
    (this.jumptoPage === '') ? '' :
      (!isNaN(this.jumptoPage)) ? this.goToPage.emit(this.jumptoPage) : null;
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
