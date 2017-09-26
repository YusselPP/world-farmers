import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  search = {
    bounds: null,
    filter: null
  };

  private _location;

  searchChange = new EventEmitter();
  locationChange = new EventEmitter();

  constructor() { }

  set bounds(bounds) {
    this.search.bounds = bounds;
    this.searchChange.emit(this.search);
  }

  get bounds() {
    return this.search.bounds;
  }

  set filter(filter) {
    this.search.filter = filter;
    this.searchChange.emit(this.search);
  }

  get filter() {
    return this.search.filter;
  }

  set location(location) {
    this._location = location;
    this.locationChange.emit(this._location);
  }

}
