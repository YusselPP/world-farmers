import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../../directory/const';
import { GeolocationService } from '../../shared/geolocation.service';
import { GeocoderService } from '../../map/geocoder.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [GeocoderService]
})
export class HeaderComponent implements OnInit {
  locality;

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public geolocationService: GeolocationService,
    private geocoderService: GeocoderService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef) {

    console.log('header component');

    this.setCurrentLocation();
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

  setCurrentLocation() {
    this.geolocationService.currentPosition
      .map(position => {
        return this.geocoderService.geocodeLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      })
      .subscribe(
        observer => {

          observer.subscribe(locality => {
              console.log(locality.formatted_address);
              this.locality = locality.formatted_address;
              this.changeDetectorRef.detectChanges();
            });
        },
        error => console.error(error)
      );
  }
}
