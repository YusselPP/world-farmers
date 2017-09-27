import { Component, ElementRef, Inject, ViewChild } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { APP_ROUTES } from '../../const';
import { PaginationService } from '../../pagination/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  @ViewChild('searchEle') searchEle: ElementRef;

  constructor(
    @Inject(APP_ROUTES) public appRoute,
    public auth: AuthService,
    public search: SearchService,
    private route: ActivatedRoute,
    private paginationService: PaginationService
  ) {
    paginationService.currentRoute = route;
  }

  onSearch(form: NgForm) {
    console.log(this.searchEle.nativeElement.value);
    this.search.setFilter(this.searchEle.nativeElement.value);
  }

  onSearchBlur() {
    this.search.search.filter = this.searchEle.nativeElement.value;
  }
}
