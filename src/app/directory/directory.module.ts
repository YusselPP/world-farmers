import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { DirectoryRoutingModule } from './directory-routing.module';
import { ContactItemComponent } from './contacts-list/contact-item/contact-item.component';
import { DirectoryComponent } from './directory.component';
import { ContactService } from '../shared/contact.service';

@NgModule({
  declarations: [
    ContactDetailComponent,
    ContactEditComponent,
    ContactsListComponent,
    ContactItemComponent,
    DirectoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectoryRoutingModule
  ],
  providers: [
    ContactService
  ]
})
export class DirectoryModule {}
