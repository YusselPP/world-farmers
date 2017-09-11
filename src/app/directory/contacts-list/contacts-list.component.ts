import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ContactService } from '../../shared/contact.service';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../const';
import { PaginationService } from '../../pagination/pagination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { Observable } from 'rxjs/Observable';
import { Page } from '../page.interface';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Observable<Page<Contact>>;

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private paginationService: PaginationService,
    private contactService: ContactService) { console.log('contact list component');}

  ngOnInit() {
    this.contacts = this.contactService.contactsChange
      .do((contacts: Contact[]) => {
        this.paginationService.dataCount = this.contactService.contactsCount;
        if (contacts.length === 0 && this.paginationService.pageCount > 1) {
          // TODO: When datacount equals 0 show empty list message
          console.log(this.paginationService.pageCount, this.paginationService.dataCount);
          this.router.navigate([this.paginationService.pageCount], { relativeTo: this.route.parent });
        } else {

        }
      });

    this.route.paramMap
      .switchMap(paramMap => {
        const pageNum = +paramMap.get('num');
        const itemsPerPage = this.paginationService.itemsPerPage;

        // TODO: When invalid current page throws and didnt change page
        this.paginationService.currentPage = pageNum;
        return this.contactService.getContactsPage(pageNum, itemsPerPage);
      })
      .subscribe(page => {}, error => console.log(error));
  }
}
