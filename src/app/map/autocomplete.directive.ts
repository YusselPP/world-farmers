import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { SearchLocationService } from '../shared/search-location.service';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective implements OnChanges{
  @Input() position;

  private autocomplete;

  constructor(private ele: ElementRef, private searchLocation: SearchLocationService) {
    this.autocomplete = new google.maps.places.Autocomplete(ele.nativeElement, {types: ['geocode']});
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();

      console.log(place, place.geometry);

      if (place.geometry) {
        this.searchLocation.bounds = place.geometry.viewport;
      }
    });
  }

  ngOnChanges() {
    if (this.position) {
      const circle = new google.maps.Circle({
        center: {
          lat: this.position.coords.latitude,
          lng: this.position.coords.longitude
        },
        radius: this.position.coords.accuracy
      });
      const bounds = circle.getBounds();

      this.autocomplete.setBounds(bounds);
    }
  }

}
