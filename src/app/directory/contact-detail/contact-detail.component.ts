import { Component, Inject, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../shared/contact.service';
import { PaginationService } from '../../pagination/pagination.service';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../const';
import { SpinnerService } from '../../core/spinner/spinner.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  providers: [SpinnerService]
})
export class ContactDetailComponent implements OnInit {
  public loading = true;
  public contact: Contact = null;

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public paginationService: PaginationService,
    public spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      map => {
        const id = map.get('id');
        if (id !== null) {
          this.loading = true;
          this.contactService.get(id).subscribe(
            (contact: Contact) => {
              this.loading = false;
              this.contact = contact;
            },
            err => {
              this.loading = false;
              this.contact = null;
              console.error(err);
            }
          );
        }
      }
    );
  }
}
