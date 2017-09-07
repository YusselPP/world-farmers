export class Contact {
  public id?: string;
  public name?: string;
  public phoneNumber?: string;

  public products: string[] = [];
  public experienceYears?: string;
  public landSize?: string;
  public harvestAmount?: string;

  public locality?: string;
  public latitude?: number;
  public longitude?: number;

  constructor(
    id?: string,
    name?: string,
    phoneNumber?: string,
    products: string[] = [],
    experienceYears?: string,
    landSize?: string,
    harvestAmount?: string,
    locality?: string,
    latitude?: number,
    longitude?: number
  ) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.products = products;
    this.experienceYears = experienceYears;
    this.landSize = landSize;
    this.harvestAmount = harvestAmount;
    this.locality = locality;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
