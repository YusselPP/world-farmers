import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from '../progress-bar/progress-bar.service';

@Component({
  selector: 'app-empty-results',
  templateUrl: './empty-results.component.html',
  styleUrls: ['./empty-results.component.css']
})
export class EmptyResultsComponent implements OnInit {

  constructor(
    public progressBar: ProgressBarService
  ) { }

  ngOnInit() {
  }

}
