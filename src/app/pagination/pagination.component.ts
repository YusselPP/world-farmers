import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { PaginationService } from './pagination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  constructor(public paginationService: PaginationService) { }

  onPageEvent(event) {
    const page = event.pageIndex + 1;
    const pageSize = event.pageSize;



    if (this.paginationService.itemsPerPage !== pageSize) {
      this.paginationService.itemsPerPage = pageSize;
    }

    if (this.paginationService.currentPage !== page) {
      this.paginationService.goToPage(page);
      return;
    }

    this.paginationService.pageSizeChange.emit(pageSize);
  }
}
