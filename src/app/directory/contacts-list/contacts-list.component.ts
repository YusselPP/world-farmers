import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ContactService } from '../../shared/contact.service';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../const';
import { PaginationService } from '../../pagination/pagination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { SpinnerService } from '../../core/spinner/spinner.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
  providers: [SpinnerService]
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  loadingList = true;

  private subscriptions = [];

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public auth: AuthService,
    public spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private paginationService: PaginationService,
    private contactService: ContactService) { }

  ngOnInit() {
    this.subscriptions.push(this.contactService.contactsChange
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
          this.contacts = contacts;
        },
        err => {
          console.error(err);
        }
      ));

    this.subscriptions.push(this.paginationService.pageSizeChange
      .switchMap(size => {
        return this.getContactsPage();
      })
      .subscribe(
        (page: Contact[]) => { this.loadingList = false; },
        error => { console.error(error); this.loadingList = false; }
      ));

    this.route.paramMap
      .switchMap(paramMap => {
        const pageNum = +paramMap.get('num');
        this.paginationService.currentPage = pageNum;
        return this.getContactsPage();
      })
      .subscribe(
        (page: Contact[]) => { this.loadingList = false; },
        error => { console.error(error); this.loadingList = false; }
      );
  }

  getContactsPage() {
    const itemsPerPage = this.paginationService.itemsPerPage;
    const currPage = this.paginationService.currentPage;
    this.loadingList = true;
    return this.contactService.getContactsPage(currPage, itemsPerPage);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
