import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SpinnerConfig, SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() spinnerService: SpinnerService;
  config: SpinnerConfig;

  private subscriptions = [];

  constructor() {
  }

  ngOnInit() {
    this.config = this.spinnerService.config;
    this.subscriptions.push(
      this.spinnerService.configUpdated.subscribe(config => this.config = config)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
