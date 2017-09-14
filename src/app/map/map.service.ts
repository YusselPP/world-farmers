import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class MapService {
  public map;

  public mapInit = new EventEmitter();
  public mapClicked = new EventEmitter();

  private mexicoLatLon = {
    lat: 23.0783947,
    lng: -100.9744313
  };
  private defaultOptions = {
    zoom: 5,
    center: this.mexicoLatLon,
    scrollwheel: false,
    mapTypeControl: false
  };

  constructor() { }

  createMap(element, options?) {
    this.map = new google.maps.Map(element, Object.assign(this.defaultOptions, options));
    this.mapInit.emit(this.map);
  }

  addClickListener() {
    this.map.addListener('click', e => this.mapClicked.emit(e));
  }

  addMarker(latLng) {
    return new google.maps.Marker({
        position: latLng,
        map: this.map
      });
  }
}
