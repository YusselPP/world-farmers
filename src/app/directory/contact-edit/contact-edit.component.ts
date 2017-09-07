import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../shared/contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  @ViewChild('f') form;
  id: number;
  editMode = false;
  contact: Contact;

  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      const id = paramMap.get('id');
      if (id !== null && !isNaN(+id)) {
        this.id = +id;
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
      return;
    }

    // const name: string = form.value.name;
    // const phoneNumber: string = form.value.phoneNumber;
    // const products: string[] = form.value.products.split(',').reduce((result, product) => {
    //   const tProduct = product.trim();
    //   if (tProduct !== '') {
    //     result.push(tProduct);
    //   }
    //   return result;
    // }, []);
    // const experienceYears: string = form.value.experienceYears;
    // const landSize: string = form.value.landSize;
    // const harvestAmount: string = form.value.harvestAmount;
    // const locality: string = form.value.locality;
    // const latitude: number = +form.value.latitude;
    // const longitude: number = +form.value.longitude;
    //
    // const contact = new Contact(name, phoneNumber, products, experienceYears, landSize, harvestAmount, locality, latitude, longitude);

    if (this.editMode) {
      this.contactService.update(this.id, this.contact);
    } else {
      this.contactService.store(this.contact);
    }

    console.log(this.contact);
  }

  onCancel() {

  }
}
