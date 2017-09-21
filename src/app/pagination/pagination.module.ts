import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { RouterModule } from '@angular/router';
import { MdPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MdPaginatorModule
  ],
  declarations: [
    PaginationComponent
  ],
  exports: [
    PaginationComponent
  ],
  providers: []
})
export class PaginationModule { }
