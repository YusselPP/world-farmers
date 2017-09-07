import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../shared/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  @ViewChild('f') form;
  id: string;
  editMode = false;
  contact: Contact;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      const id = paramMap.get('id');
      if (id !== null) {
        this.id = id;
        this.editMode = true;
        this.contact = this.contactService.get(this.id);
        console.log(this.form);
      } else {
        this.contact = new Contact();
      }
    });
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      window.scrollTo(0, 0);
      return;
    }

    if (this.editMode) {
      this.contactService.update(this.id, this.contact);
    } else {
      this.contactService.store(this.contact);
    }

    console.log(this.contact);

    this.router.navigate(['/directorio']);
  }

}
