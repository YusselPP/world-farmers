import { Component, Input, OnChanges } from '@angular/core';
import { MapService } from '../../../map/map.service';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css'],
  providers: [MapService]
})
export class LocationMapComponent implements OnChanges {
  @Input() latitude;
  @Input() longitude;

  constructor(public mapService: MapService) {
    this.mapService.mapInit.subscribe(map => {
      this.ngOnChanges();
    });
  }

  ngOnChanges() {
    if (!this.mapService.map) {
      return;
    }
    const latLng = {
      lat: this.latitude,
      lng: this.longitude
    };

    this.mapService.addMarker(latLng);
    this.mapService.map.panTo(latLng);
  }
}
