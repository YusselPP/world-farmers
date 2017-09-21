import { Component, Input, OnInit } from '@angular/core';
import { SpinnerConfig, SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() spinnerService: SpinnerService;
  config: SpinnerConfig;

  constructor() {
  }

  ngOnInit() {
    this.config = this.spinnerService.config;
    this.spinnerService.configUpdated.subscribe(config => this.config = config);
  }

}
