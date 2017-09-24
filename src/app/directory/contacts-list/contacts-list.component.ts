import { ChangeDetectorRef, Component, Inject, NgZone, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ContactService } from '../../shared/contact.service';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../const';
import { PaginationService } from '../../pagination/pagination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { SpinnerService } from '../../core/spinner/spinner.service';
import { SearchLocationService } from '../../shared/search-location.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
  providers: [SpinnerService]
})
export class ContactsListComponent implements OnDestroy {
  contacts: Contact[] = [];
  _loadingList = true;

  private subscriptions = [];

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public auth: AuthService,
    public spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private searchLocation: SearchLocationService,
    private paginationService: PaginationService,
    private contactService: ContactService) {

    this.subscriptions.push(
      this.paginationService.pageSizeChange
        .switchMap(size => {
          return this.getContactsPage();
        })
        .subscribe(
          contacts => this.onContactsLoad(contacts),
          error => this.onError(error)
        )
    );

    this.subscriptions.push(
      this.searchLocation.boundsChange
        .switchMap(bounds => {
          this.router.navigate([1], {relativeTo: this.route.parent});
          return this.getContactsPage();
        })
        .subscribe(
          contacts => this.onContactsLoad(contacts),
          error => this.onError(error)
        )
    );

    this.route.paramMap
      .map(params => +params.get('num'))
      .switchMap(pageNum => {
        this.paginationService.currentPage = pageNum;
        return this.getContactsPage();
      })
      .subscribe(
        contacts => this.onContactsLoad(contacts),
        error => this.onError(error)
      );
  }

  get loadingList() {
    return this._loadingList;
  }

  set loadingList(loadingList) {
    this._loadingList = loadingList;
  }

  getContactsPage() {
    const itemsPerPage = this.paginationService.itemsPerPage;
    const currPage = this.paginationService.currentPage;
    const bounds = this.searchLocation.bounds;

    this.loadingList = true;

    if (!bounds) {
      return Promise.resolve([]);
    }

    return this.contactService.getContactsPage(currPage, itemsPerPage, bounds);
  }

  onContactsLoad(contacts) {
    this.zone.run(() => {
      const currentPage = this.paginationService.currentPage;

      this.paginationService.dataCount = this.contactService.contactsCount;

      // if the page has no data we assume is an invalid page
      if (contacts.length === 0 && this.paginationService.currentPage !== 1) {
        const totalPages = this.paginationService.pageCount;
        let navigateTo = 1;

        if (currentPage > totalPages && totalPages > 1) {
          navigateTo = totalPages;
        }

        this.router.navigate([navigateTo], {relativeTo: this.route.parent});
      }

      this.contacts = contacts;
      this.loadingList = false;
    });
  }

  onError(error) {
    console.error(error);
    this.loadingList = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
