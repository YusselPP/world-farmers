import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { APP_DIR_ROUTE } from '../directory/const';
import { APP_ROUTE } from '../const';

@Injectable()
export class PaginationService {
  public currentPage: number;
  public pages: number[];
  public currentRoute;

  private _itemsPerPage: number;

  constructor(@Inject(APP_ROUTE) public appRoute,
              @Inject(APP_DIR_ROUTE) public dirRoute,
              private router: Router) {
    console.log('pagination service');
    this.pages = [];
    this.currentPage = 1;
    this.itemsPerPage = 20;
    this.dataCount = 0;
    // this.setPages(10);
  }

  set dataCount(dataCount: number) {
    if (dataCount < 0) {
      console.error('dataCount value must be greater than or equal to 0');
      return;
    }
    this.setPages(Math.ceil(dataCount / this.itemsPerPage));
  }

  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  set itemsPerPage(itemsPerPage: number) {
    if (itemsPerPage < 1) {
      console.error('itemsPerPage value must be greater than 0');
      return;
    }
    this._itemsPerPage = itemsPerPage;
  }

  get pageCount() {
    return this.pages.length;
  }

  goToPage(pageNum: number) {
    if (pageNum < 1 || pageNum > this.pageCount) {
      console.warn('goToPage - Invalid pageNum(' + pageNum + '). pageNum should be between(1, ' + this.pageCount + ').');
      return;
    }
    if (this.currentPage === pageNum) {
      return;
    }
    this.currentPage = pageNum;
    //this.router.navigate([newUrl, pageNum]);
    console.log(this.currentRoute);
  }

  prevPage() {
    if (!this.canGoPrev()) {
      console.warn('prevPage - There are no more previous pages, you are already in the first page.');
      return;
    }
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    if (!this.canGoNext()) {
      console.warn('nextPage - There are no more next pages, you are already in the last page.');
      return;
    }
    this.goToPage(this.currentPage + 1);
  }

  setPages(n: number) {
    this.pages.length = 0;
    for (let i = 1; i <= n; i++) {
      this.pages.push(i);
    }
  }

  canGoPrev(): boolean {
    return this.currentPage > 1;
  }

  canGoNext(): boolean {
    return this.currentPage < this.pageCount;
  }
}
