import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapService } from '../../../map/map.service';

@Component({
  selector: 'app-set-location-map',
  templateUrl: './set-location-map.component.html',
  styleUrls: ['./set-location-map.component.css']
})
export class SetLocationMapComponent implements OnInit {
  @Input() latLng;
  @Output() markerMoved = new EventEmitter();
  private marker;

  constructor(public mapService: MapService) {
    this.mapService.mapInit.subscribe(map => {
      this.onMapInit();
    });
  }

  ngOnInit() {
  }

  onMapInit() {
    if (this.latLng) {
      this.mapService.map.panTo(this.latLng);
      this.moveMarker(this.latLng);
    }
    this.mapService.addClickListener();
    this.mapService.mapClicked.subscribe(e => {
      this.moveMarker(e.latLng);
    });
  }

  moveMarker(latLng) {
    if (!this.marker) {
      this.marker = this.mapService.addMarker(latLng);
    } else {
      this.marker.setPosition(latLng);
    }
    this.markerMoved.emit(latLng);
  }

}
