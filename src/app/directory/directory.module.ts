import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { DirectoryRoutingModule } from './directory-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContactItemComponent } from './contacts-list/contact-item/contact-item.component';

@NgModule({
  declarations: [
    ContactDetailComponent,
    ContactEditComponent,
    ContactsListComponent,
    ContactItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectoryRoutingModule,
    SharedModule
  ]
})
export class DirectoryModule {}
