import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../../directory/const';
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
  showBar;

  private subscriptions = [];

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public search: SearchService,
    public authService: AuthService,
    public geolocationService: GeolocationService,
    public progressBar: ProgressBarService,
    private router: Router,
    private geocoderService: GeocoderService,
    private changeDetectorRef: ChangeDetectorRef) {

    this.progressBar.configUpdated.subscribe(() => {
      this.showBar = this.progressBar.isShown();
      this.changeDetectorRef.detectChanges();
    });
    this.setCurrentLocation();
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate([this.appRoute.SLASH]);
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
          console.log('currentPosition subscriber called');
          observer.subscribe(locality => {
            if (locality.geometry) {
              this.search.bounds = locality.geometry.bounds;
            }
            this.locality = locality.formatted_address;
            this.changeDetectorRef.detectChanges();
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
