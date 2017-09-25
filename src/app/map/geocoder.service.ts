import { EventEmitter, Injectable } from '@angular/core';
import Geocoder = google.maps.Geocoder;
import GeocoderStatus = google.maps.GeocoderStatus;

@Injectable()
export class GeocoderService {
  geocodeFound = new EventEmitter();
  geocoder = new Geocoder;

  constructor() { }

  geocodeLatLng(latLng) {
    this.geocoder.geocode({'location': latLng}, (results, status) => {
      if (status === GeocoderStatus.OK) {
        const resultLen = results.length;

        if (resultLen > 0) {
          for (let i = resultLen - 3; i < resultLen; i++) {
            if (results[i]) {
              this.geocodeFound.emit(results[i]);
              return;
            }
          }
        } else {
          console.log('geocodeLatLng - No results found');
          this.geocodeFound.emit({});
        }
      } else {
        console.log('geocodeLatLng - Geocoder failed due to: ' + status);
        this.geocodeFound.emit({});
      }
    });
    return this.geocodeFound;
  }
}
