import { Component, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { APP_ROUTES } from '../../const';
import { GeolocationService } from '../../shared/geolocation.service';
import { GeocoderService } from '../../map/geocoder.service';
import { Router } from '@angular/router';
import { ProgressBarService } from '../progress-bar/progress-bar.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [GeocoderService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  locality;
  currentPos;

  private subscriptions = [];

  constructor(
    @Inject(APP_ROUTES) public appRoute,
    public search: SearchService,
    public authService: AuthService,
    public geolocationService: GeolocationService,
    public progressBar: ProgressBarService,
    private router: Router,
    private geocoderService: GeocoderService,
    private zone: NgZone) {

    this.setCurrentLocation();
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate([this.appRoute.HOME]);
  }

  setCurrentLocation() {
    this.subscriptions.push(
      this.geolocationService.currentPosition
      .map(position => {
        this.currentPos = position;
        return this.geocoderService.geocodeLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      })
      .subscribe(
        observer => {
            const subscription = observer.subscribe(locality => {
              this.zone.run(() => {
                if (locality.geometry) {
                  this.search.bounds = locality.geometry.bounds;
                }
                this.locality = locality.formatted_address;
                subscription.unsubscribe();
              });
            });
        },
        error => console.error(error)
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
