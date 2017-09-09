import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ContactService } from '../../shared/contact.service';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../const';
import { PaginationService } from '../../pagination/pagination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contactsMap;
  contactsIds;
  contactsChangeSubscription;

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public auth: AuthService,
    private route: ActivatedRoute,
    private paginationService: PaginationService,
    private contactService: ContactService) { console.log('contact list component');}

  ngOnInit() {
    this.paginationService.dataCount = this.contactService.getContactsCount();
    this.contactsChangeSubscription = this.contactService.contactsChange.subscribe(this.onContacsChange.bind(this));
    this.route.paramMap
      .map(paramMap => +paramMap.get('num'))
      .subscribe(pageNum => {
        const itemsPerPage = this.paginationService.itemsPerPage;
        this.paginationService.currentPage = pageNum;
        // this.contactsMap = this.contactService.getContactsChunk((pageNum - 1) * itemsPerPage, itemsPerPage);
        this.contactsMap = this.contactService.getContacts();
        this.contactsIds = Object.keys(this.contactsMap);
      });
  }

  ngOnDestroy() {
    this.contactsChangeSubscription.unsubscribe();
  }

  onContacsChange(contactsMap) {
    this.contactsMap = contactsMap;
    this.contactsIds = Object.keys(contactsMap);
  }
}
