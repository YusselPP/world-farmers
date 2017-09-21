import { EventEmitter, Injectable } from '@angular/core';


@Injectable()
export class SpinnerService {
  static defaultConfig: SpinnerConfig = {
    color: '#007bff',
    mode: 'indeterminate'
  };

  configUpdated = new EventEmitter<SpinnerConfig>();
  config: SpinnerConfig;

  constructor() {
    this.config = SpinnerService.defaultConfig;
  }

  updateConfig(config: SpinnerConfig) {
    Object.assign(this.config, config);
    this.configUpdated.emit(this.config);
  }
}

export interface SpinnerConfig {
  isShown?: boolean;
  color?: string;
  mode?: string;
  value?: number;
  strokeWidth?: string;
}
