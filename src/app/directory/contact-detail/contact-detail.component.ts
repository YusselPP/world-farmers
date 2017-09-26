import { Component, Inject, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../shared/contact.service';
import { PaginationService } from '../../pagination/pagination.service';
import { APP_ROUTES } from '../../const';
import { SpinnerService } from '../../core/spinner/spinner.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  providers: [SpinnerService]
})
export class ContactDetailComponent implements OnInit {
  public loading = true;
  public contact: Contact = null;
  public imageUrl;

  constructor(
    @Inject(APP_ROUTES) public appRoute,
    public auth: AuthService,
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
              this.contact.getImageUrl().subscribe(
                url => this.imageUrl = url,
                err => console.log(err)
              );
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
