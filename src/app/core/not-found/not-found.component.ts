import { Component, Inject, OnInit } from '@angular/core';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../../directory/const';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute
  ) { console.log('not found component');}

  ngOnInit() {
  }

}
