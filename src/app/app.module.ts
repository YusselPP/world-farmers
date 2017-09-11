import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import { DirectoryModule } from './directory/directory.module';
import { APP_ROUTE, ROUTE } from './const';
import { AjaxInterceptor } from './shared/ajax.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
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
