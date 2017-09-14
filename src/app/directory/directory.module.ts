import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { DirectoryRoutingModule } from './directory-routing.module';
import { ContactItemComponent } from './contacts-list/contact-item/contact-item.component';
import { DirectoryComponent } from './directory.component';
import { ContactService } from '../shared/contact.service';
import { PaginationModule } from '../pagination/pagination.module';
import { APP_DIR_ROUTE, DIRECTORY_ROUTE } from './const';
import { PagesComponent } from './pages/pages.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { MapModule } from '../map/map.module';

@NgModule({
  declarations: [
    ContactDetailComponent,
    ContactEditComponent,
    ContactsListComponent,
    ContactItemComponent,
    DirectoryComponent,
    PagesComponent,
    LocationMapComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    MapModule,
    DirectoryRoutingModule
  ],
  providers: [
    { provide: APP_DIR_ROUTE, useValue: DIRECTORY_ROUTE },
    ContactService
  ]
})
export class DirectoryModule {}
