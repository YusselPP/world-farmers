import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { AuthService } from '../../auth/auth.service';
import { ContactService } from '../../shared/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private auth: AuthService, private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.contacts;
  }

  onNew() {

  }
}
