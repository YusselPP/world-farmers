import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeolocationService {
  geolocation = navigator.geolocation;

  private _currentPosition: Observable<Position>;

  constructor() {
    this._currentPosition = new Observable(this.getCurrentPosition.bind(this));
  }

  getCurrentPosition(observer) {
    console.log('getCurrentPosition called');
    if (this.geolocation) {
      this.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();
      }, error => {
        observer.error(error);
      });
    } else {
      observer.error(new Error('Geolocation not supported by your browser'));
    }
  }

  get currentPosition() {
    return this._currentPosition;
  }
}
