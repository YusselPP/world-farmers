import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgressBarConfig, ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  config: ProgressBarConfig;

  private subscriptions = [];

  constructor(private progressBarService: ProgressBarService) {
    this.config = progressBarService.config;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.progressBarService.configUpdated.subscribe(config => this.config = config)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }
}
