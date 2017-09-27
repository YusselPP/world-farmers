import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  lastSearchFilter;

  search = {
    bounds: null,
    filter: null,
    location: null
  };

  searchChange = new EventEmitter();

  constructor() { }

  setBounds(bounds) {
    this.search.bounds = bounds;
    this.search.location = null;
    this.searchChange.emit(this.search);
  }

  getBounds() {
    return this.search.bounds;
  }

  setLocation(location) {
    this.search.location = location;
    this.search.bounds = null;
    this.searchChange.emit(this.search);
  }

  getLocation() {
    return this.search.location;
  }

  setFilter(filter) {
    this.search.filter = filter;
    this.searchChange.emit(this.search);
  }

  getFilter() {
    return this.search.filter;
  }

}
