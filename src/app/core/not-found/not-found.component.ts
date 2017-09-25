import { Component, Inject, OnInit } from '@angular/core';
import { APP_ROUTES } from '../../const';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    @Inject(APP_ROUTES) public appRoute
  ) { }

  ngOnInit() {
  }

}
