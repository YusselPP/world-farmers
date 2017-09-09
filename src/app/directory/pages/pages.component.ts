import { Component, Inject, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { APP_DIR_ROUTE } from '../const';
import { APP_ROUTE } from '../../const';
import { PaginationService } from '../../pagination/pagination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public auth: AuthService,
    private route: ActivatedRoute,
    private paginationService: PaginationService
  ) {
    paginationService.currentRoute = route;
  }

  ngOnInit() {
  }

}
