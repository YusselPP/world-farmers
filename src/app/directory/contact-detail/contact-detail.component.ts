import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../shared/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  private contact: Contact;

  constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      map => {
        const id = map.get('id');
        if (id !== null) {
          this.contact = this.contactService.contacts[id];
        }
      }
    );
  }
}
