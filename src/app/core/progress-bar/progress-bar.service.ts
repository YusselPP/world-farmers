import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ProgressBarService {
  static defaultConfig: ProgressBarConfig = {
    isShown: false,
    color: 'primary',
    mode: 'indeterminate'
  };


  configUpdated = new EventEmitter<ProgressBarConfig>();
  config: ProgressBarConfig;

  constructor() {
    this.config = ProgressBarService.defaultConfig;
  }

  show() {
    this.updateConfig({ isShown: true} );
  }

  hide() {
    this.updateConfig({ isShown: false} );
  }

  isShown() {
    return this.config.isShown;
  }

  updateConfig(config: ProgressBarConfig) {
    Object.assign(this.config, config);
    this.configUpdated.emit(this.config);
  }

}

export interface ProgressBarConfig {
  isShown?: boolean;
  color?: string;
  mode?: string;
}
