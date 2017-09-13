import { Component, Inject, Input, OnInit } from '@angular/core';
import { Contact } from '../../contact.model';
import { AuthService } from '../../../auth/auth.service';
import { ContactService } from '../../../shared/contact.service';
import { APP_DIR_ROUTE } from '../../const';
import { APP_ROUTE } from '../../../const';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  removing = false;

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public auth: AuthService,
    private contactService: ContactService) { }

  ngOnInit() {
  }

  onRemove(event: UIEvent, id: string) {
    event.preventDefault();
    event.stopPropagation();

    if (this.removing) {
      return;
    }

    this.removing = true;
    this.contactService.remove(id)
      .catch(
        error => {
          this.removing = false;
          console.error(error);
          return Observable.throw(error);
        }
      )
      .subscribe(res => this.removing = false);
  }
}
