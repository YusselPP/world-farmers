import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SearchLocationService {

  search = {
    bounds: null,
    filter: null
  };

  boundsChange = new EventEmitter();

  private _bounds;
  private _filter;

  constructor() { }

  set bounds(bounds) {
    this.search.bounds = bounds;
    this.boundsChange.emit(this.search);
  }

  get bounds() {
    return this.search.bounds;
  }

  set filter(filter) {
    this.search.filter = filter;
    this.boundsChange.emit(this.search);
  }

  get filter() {
    return this.search.filter;
  }

}
