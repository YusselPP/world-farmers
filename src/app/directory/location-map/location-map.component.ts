import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { MapService } from '../../map/map.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css'],
  providers: [MapService]
})
export class LocationMapComponent implements AfterViewInit{
  @Input() latLng;
  @Input() enableClickEvent = false;
  @Output() markerMoved = new EventEmitter();

  public isScrollWheelEnabled = false;

  private marker;

  constructor(public mapService: MapService) {
    this.mapService.createMap();
    this.mapService.mapInit.subscribe(map => {
      this.onMapInit();
    });
  }

  ngAfterViewInit() {

  }

  onMapInit() {
    if (this.latLng && isNumber(this.latLng.lat) && isNumber(this.latLng.lng)) {
      this.mapService.map.panTo(this.latLng);
      this.moveMarker(this.latLng);
    }

    if (this.enableClickEvent) {
      this.mapService.addClickListener();
      this.mapService.mapClicked.subscribe(e => {
        this.moveMarker(e.latLng);
      });
    }
  }

  moveMarker(latLng) {
    if (!this.marker) {
      this.marker = this.mapService.addMarker(latLng);
    } else {
      this.marker.setPosition(latLng);
    }
    this.markerMoved.emit(latLng);
  }

  onScrollWheelOptionChange(e) {
    this.mapService.updateOptions({
      scrollwheel: this.isScrollWheelEnabled
    });
  }
}
