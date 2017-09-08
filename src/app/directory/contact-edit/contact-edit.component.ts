import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../../shared/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from '../../pagination/pagination.service';
import { APP_DIR_ROUTE } from '../const';
import { APP_ROUTE } from '../../const';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnChanges {
  contactForm: FormGroup;
  id: string;
  editMode = false;
  contact: Contact;
  submitted = false;

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    public paginationService: PaginationService,
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private contactService: ContactService) {

    console.log('contact edit component');
    this.createForm();
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(paramMap => {

      const id = paramMap.get('id');

      if (id !== null) {
        this.id = id;
        this.editMode = true;
        this.contact = this.contactService.get(this.id);
      } else {
        this.contact = new Contact();
      }
      this.ngOnChanges();
    });
  }

  createForm() {
    this.contactForm = this.fb.group({
      name: '',
      phoneNumber: '',
      products: this.fb.array([]),
      experienceYears: '',
      landSize: '',
      harvestAmount: '',
      locality: '',
      latitude: '',
      longitude: ''
    });
  }

  ngOnChanges() {
    if (!this.contact) {
      return;
    }

    this.contactForm.reset({
      name: this.contact.name,
      phoneNumber: this.contact.phoneNumber,
      experienceYears: this.contact.experienceYears,
      landSize: this.contact.landSize,
      harvestAmount: this.contact.harvestAmount,
      locality: this.contact.locality,
      latitude: this.contact.latitude,
      longitude: this.contact.longitude
    });

    this.setProducts(this.contact.products);
  }

  get products(): FormArray {
    return this.contactForm.get('products') as FormArray;
  }

  setProducts(products: string[]) {
    const productFormControls = products.map(product => this.fb.control(product));
    const productFormArray = this.fb.array(productFormControls);
    this.contactForm.setControl('products', productFormArray);
  }


  addProduct() {
    this.products.push(this.fb.control(''));
  }

  removeProduct(pos: number) {
    this.products.removeAt(pos);
  }

  onSave() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      window.scrollTo(0, 0);
      return;
    }

    this.contact = this.prepareSaveContact();

    if (this.editMode) {
      this.contactService.update(this.id, this.contact);
    } else {
      this.contactService.store(this.contact);
    }

    this.ngOnChanges();

    this.router.navigate([
      this.appRoute.SLASH,
      this.dirRoute.ROOT,
      this.dirRoute.PAGE,
      this.paginationService.currentPage
    ]);
  }

  prepareSaveContact(): Contact {
    const formModel = this.contactForm.value;

    return {
      id: this.contact.id,
      name: formModel.name,
      phoneNumber: formModel.phoneNumber,
      experienceYears: formModel.experienceYears,
      landSize: formModel.landSize,
      harvestAmount: formModel.harvestAmount,
      locality: formModel.locality,
      latitude: formModel.latitude,
      longitude: formModel.longitude,
      products: formModel.products.slice()
    };
  }

  revert() { this.ngOnChanges(); }

}
