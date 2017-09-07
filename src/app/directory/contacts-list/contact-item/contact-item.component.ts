import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../contact.model';
import { AuthService } from '../../../auth/auth.service';
import { ContactService } from '../../../shared/contact.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Input() index: number;

  constructor(private auth: AuthService, private contactService: ContactService) { }

  ngOnInit() {
  }

  onRemove(event: UIEvent, id: number) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();

    this.contactService.remove(id);
  }
}
