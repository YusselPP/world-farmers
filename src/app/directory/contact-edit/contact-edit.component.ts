import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../../shared/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from '../../pagination/pagination.service';
import { APP_ROUTES } from '../../const';
import { Contact } from '../contact.model';
import { DateService } from '../../shared/date.service';
import { MapService } from '../../map/map.service';
import { isFunction } from 'util';
import { GeocoderService } from '../../map/geocoder.service';
import { SpinnerService } from '../../core/spinner/spinner.service';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  providers: [MapService, GeocoderService, SpinnerService]
})
export class ContactEditComponent implements OnInit, OnChanges {
  contactForm: FormGroup;
  id: string;
  editMode = false;
  submitted = false;
  loading = true;
  saving = false;
  showCoordinates = false;
  contact: Contact = null;
  Contact = Contact;
  image = '';

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 256,
    resizeMaxWidth: 256
  };

  constructor(
    @Inject(APP_ROUTES) public appRoute,
    public dateService: DateService,
    public paginationService: PaginationService,
    public spinnerService: SpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private contactService: ContactService,
    private geocoderService: GeocoderService) {

    this.createForm();
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(paramMap => {

      const id = paramMap.get('id');

      if (id !== null) {
        this.id = id;
        this.editMode = true;
        this.loading = true;
        // this.contact = this.contactService.get(this.id);
        // this.contact = new Contact();
        this.contactService.get(this.id).subscribe(
          (contacts: Contact) => {
            this.loading = false;
            this.contact = contacts;
            this.ngOnChanges();
          },
          err => {
            this.loading = false;
            console.error(err);
          }
        );
      } else {
        this.loading = false;
        this.contact = new Contact();
      }
    });
  }

  createForm() {
    this.contactForm = this.fb.group({
      name: '',
      phoneNumber: '',
      products: this.fb.array(['']),
      startedWorking: this.dateService.today(),
      landSize: '',
      landSizeUnit: '',
      harvestAmount: '',
      harvestAmountUnit: '',
      locality: '',
      latitude: '',
      longitude: '',
      showCoordinates: this.showCoordinates
    });
  }

  ngOnChanges() {
    if (!this.contact) {
      return;
    }

    this.contactForm.reset({
      name: this.contact.name,
      phoneNumber: this.contact.phoneNumber,
      startedWorking: this.contact.startedWorking || this.dateService.today(),
      landSize: this.contact.landSize,
      landSizeUnit: this.contact.landSizeUnit,
      harvestAmount: this.contact.harvestAmount,
      harvestAmountUnit: this.contact.harvestAmountUnit,
      locality: this.contact.locality,
      latitude: this.contact.latitude,
      longitude: this.contact.longitude,
      showCoordinates: this.showCoordinates
    });

    if (this.contact.products.length > 0) {
      this.setProducts(this.contact.products);
    } else {
      this.setProducts(['']);
    }
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

    if (this.saving) {
      return;
    }

    if (this.contactForm.invalid) {
      window.scrollTo(0, 0);
      return;
    }

    this.contact = this.prepareSaveContact();
    this.saving = true;

    if (this.editMode) {
      this.contactService.update(this.id, this.contact)
        .subscribe(
          () => {
            this.saving = false;
            this.router.navigate([
              '/' + this.appRoute.PAGE(this.paginationService.currentPage)
            ]);
          },
          error => {
            console.error(error);
            this.saving = false;
          }
        );
    } else {
      this.contactService.store(this.contact)
        .subscribe(
          () => {
            this.saving = false;
            this.router.navigate(['/' + this.appRoute.PAGE(this.paginationService.currentPage)]);
          },
          error => {
            console.error(error);
            this.saving = false;
          }
        );
    }

    this.ngOnChanges();
  }

  prepareSaveContact(): Contact {
    const formModel = this.contactForm.value;

    return new Contact({
      id: this.contact.id,
      name: formModel.name,
      phoneNumber: formModel.phoneNumber,
      startedWorking: formModel.startedWorking,
      landSize: formModel.landSize,
      landSizeUnit: formModel.landSizeUnit,
      harvestAmount: formModel.harvestAmount,
      harvestAmountUnit: formModel.harvestAmountUnit,

      locality: formModel.locality,
      latitude: formModel.latitude,
      longitude: formModel.longitude,
      products: formModel.products.slice()
    });
  }

  onMapMarkerMoved(e) {
    const lat = isFunction(e.lat) ? e.lat() : e.lat;
    const lng = isFunction(e.lng) ? e.lng() : e.lng;
    this.contactForm.get('latitude').setValue(lat);
    this.contactForm.get('longitude').setValue(lng);

    this.geocoderService.geocodeLatLng({lat: lat, lng: lng})
      .subscribe(locality => {
        this.contactForm.get('locality').setValue(locality.formatted_address);
      });
  }

  selectedImage(imageResult: ImageResult) {
    console.log(imageResult);

    if (imageResult.error) {
      this.image = '';
      return;
    }

    this.image = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }
}
