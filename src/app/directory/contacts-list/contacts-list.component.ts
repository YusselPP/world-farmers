import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ContactService } from '../../shared/contact.service';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../const';
import { PaginationService } from '../../pagination/pagination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];

  private contactsChangeSubscription;

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private paginationService: PaginationService,
    private contactService: ContactService) { console.log('contact list component');}

  ngOnInit() {
    this.contactsChangeSubscription = this.contactService.contactsChange
      .do((contacts: Contact[]) => {
        const currentPage = this.paginationService.currentPage;

        this.paginationService.dataCount = this.contactService.contactsCount;

        // if the page has no data we assume is an invalid page
        if (contacts.length === 0 && this.paginationService.currentPage !== 1) {
          const totalPages = this.paginationService.pageCount;
          let navigateTo = 1;

          if (currentPage > totalPages) {
            navigateTo = totalPages;
          }

          this.router.navigate([navigateTo], {relativeTo: this.route.parent});
        }
      })
      .subscribe(
        (contacts: Contact[]) => {
          console.log('list component: contacts changed');
          this.contacts = contacts;
        },
        err => {
          console.error(err);
        }
      );

    this.route.paramMap
      .switchMap(paramMap => {
        const pageNum = +paramMap.get('num');
        const itemsPerPage = this.paginationService.itemsPerPage;

        this.paginationService.currentPage = pageNum;
        return this.contactService.getContactsPage(pageNum, itemsPerPage);
      })
      .subscribe(
        (page: Contact[]) => { },
        error => console.error(error)
      );
  }

  ngOnDestroy() {
    this.contactsChangeSubscription.unsubscribe();
  }
}
