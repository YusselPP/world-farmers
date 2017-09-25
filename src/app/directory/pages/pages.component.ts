import { Component, Inject } from '@angular/core';

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
    this.search.filter = form.value.search;
  }
}
