import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class MapService {
  public mapContainerAvailable = new EventEmitter();
  public mapInit = new EventEmitter();
  public mapClicked = new EventEmitter();
  public tilesLoaded = new EventEmitter();
  public map;

  private mapContainer;
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

  setMapContainer(element) {
    this.mapContainer = element;
    this.mapContainerAvailable.emit();
  }

  createMap(options?) {
    let mapContainerAvailableSub;

    if (this.mapContainer) {
      this.map = new google.maps.Map(this.mapContainer, Object.assign(this.defaultOptions, options));
      this.mapInit.emit();
    } else {
      mapContainerAvailableSub = this.mapContainerAvailable.subscribe(() => {
        mapContainerAvailableSub.unsubscribe();
        this.createMap(options);
      });
    }
  }

  addClickListener() {
    this.map.addListener('click', e => this.mapClicked.emit(e));
  }

  addTilesLoadedListener() {
    this.map.addListener('tilesloaded', e => this.tilesLoaded.emit(e));
  }

  addMarker(latLng) {
    return new google.maps.Marker({
        position: latLng,
        map: this.map
      });
  }

  updateOptions(options) {
    this.map.setOptions(options);
  }
}
