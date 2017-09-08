import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { PaginationService } from './pagination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements AfterViewInit {
  @ViewChild('nav') navElement: ElementRef;

  constructor(public paginationService: PaginationService, private activatedRoute: ActivatedRoute) { console.log('pagination component'); }

  ngAfterViewInit() {
    console.log(this.navElement.nativeElement.clientWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('Width: ' + event.target.innerWidth);
    console.log(this.navElement.nativeElement.clientWidth);
  }
}
