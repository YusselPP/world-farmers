import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ContactService } from '../../shared/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contactsMap;
  contactsIds;
  contactsChangeSubscription;

  constructor(public auth: AuthService, private contactService: ContactService) { }

  ngOnInit() {
    this.contactsMap = this.contactService.getContacts();
    this.contactsIds = Object.keys(this.contactsMap);
    this.contactsChangeSubscription = this.contactService.contactsChange.subscribe(this.onContacsChange.bind(this));
  }

  ngOnDestroy() {
    this.contactsChangeSubscription.unsubscribe();
  }

  onContacsChange(contactsMap) {
    console.log(contactsMap);
    this.contactsMap = contactsMap;
    this.contactsIds = Object.keys(contactsMap);
  }
}
