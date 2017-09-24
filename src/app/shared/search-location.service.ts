import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SearchLocationService {

  boundsChange = new EventEmitter();

  private _bounds;

  constructor() { }

  set bounds(bounds) {
    this._bounds = bounds;
    this.boundsChange.emit(bounds);
  }

  get bounds() {
    return this._bounds;
  }

}
