import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoggingInterceptor } from '../shared/logging.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { MdProgressBarModule, MdProgressSpinnerModule } from '@angular/material';
import { ProgressBarInterceptor } from './progress-bar/progress-bar.interceptor';
import { EmptyResultsComponent } from './empty-results/empty-results.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MapModule } from '../map/map.module';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    ProgressBarComponent,
    EmptyResultsComponent,
    SpinnerComponent,
    DialogComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MapModule
  ],
  exports: [
    HeaderComponent,
    ProgressBarComponent,
    EmptyResultsComponent,
    SpinnerComponent
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ProgressBarInterceptor, multi: true}
  ]
})
export class CoreModule {}
