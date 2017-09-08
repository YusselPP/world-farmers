import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {
  public currentPage: number;
  public itemsPerPage: number;
  public pages: number[];

  constructor() {
    this.currentPage = 1;
    this.itemsPerPage = 20;
    this.pages = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,100,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  }

  get pageCount() {
    return this.pages.length;
  }

  goToPage(pageNum: number) {
    if (pageNum < 1 || pageNum > this.pageCount) {
      console.warn('goToPage - Invalid pageNum(' + pageNum + '). pageNum should be between(1, ' + this.pageCount + ').');
      return;
    }
    this.currentPage = pageNum;
  }

  prevPage() {
    if (this.currentPage <= 1) {
      console.warn('prevPage - There are no more previous pages, you are already in the first page.');
      return;
    }
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage >= this.pageCount) {
      console.warn('nextPage - There are no more next pages, you are already in the last page.');
      return;
    }
    this.goToPage(this.currentPage + 1);
  }
}
