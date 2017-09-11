import { Component, Inject, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../shared/contact.service';
import { PaginationService } from '../../pagination/pagination.service';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../const';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  public contact: Contact;
  public today = Date.now();

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public paginationService: PaginationService,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService) {console.log('contact detail component'); }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      map => {
        const id = map.get('id');
        if (id !== null) {
          this.contactService.get(id).subscribe(
            (contact: Contact) => {
              this.contact = contact;
            },
            err => {
              console.error(err);
            }
          );
        }
      }
    );
  }
}
