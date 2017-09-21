import { Component, OnInit } from '@angular/core';
import { ProgressBarConfig, ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  config: ProgressBarConfig;

  constructor(private progressBarService: ProgressBarService) {
    this.config = progressBarService.config;
  }

  ngOnInit() {
    this.progressBarService.configUpdated.subscribe(config => this.config = config);
  }

}
