import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination/pagination.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
  providers: [PaginationService]
})
export class DirectoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
