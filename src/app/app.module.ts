import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import { DirectoryModule } from './directory/directory.module';
import { APP_ROUTE, ROUTE } from './const';
import { AjaxInterceptor } from './shared/ajax.interceptor';
import { DateService } from './shared/date.service';
import { AuthGuard } from './auth/auth-guard.service';
import { GeolocationService } from './shared/geolocation.service';
import { GeocoderService } from './map/geocoder.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    GeolocationService,
    GeocoderService,
    DateService,
    AuthGuard,
    { provide: APP_ROUTE, useValue: ROUTE },
    { provide: HTTP_INTERCEPTORS, useClass: AjaxInterceptor, multi: true }
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    SharedModule,
    AuthModule,
    DirectoryModule,
    CoreModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
