import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import { DirectoryModule } from './directory/directory.module';
import { APP_ROUTES, ROUTES } from './const';
import { AjaxInterceptor } from './shared/ajax.interceptor';
import { DateService } from './shared/date.service';
import { AuthGuard } from './auth/auth-guard.service';
import { GeolocationService } from './shared/geolocation.service';
import { GeocoderService } from './map/geocoder.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ProgressBarService } from './core/progress-bar/progress-bar.service';
import { SearchService } from './shared/search.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    ProgressBarService,
    GeolocationService,
    GeocoderService,
    SearchService,
    DateService,
    AuthGuard,
    AuthService,
    { provide: APP_ROUTES, useValue: ROUTES },
    { provide: HTTP_INTERCEPTORS, useClass: AjaxInterceptor, multi: true }
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['world-farmers.com', 'localhost:4200']
      }
    }),

    SharedModule,
    AuthModule,
    CoreModule,
    DirectoryModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
