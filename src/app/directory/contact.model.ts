export class Contact {
  public id?: string;
  public name?: string;
  public phoneNumber?: string;

  public products: string[] = [];
  public experienceYears?: string;
  public experienceYearsUnit?: string;
  public landSize?: string;
  public landSizeUnit?: string;
  public harvestAmount?: string;
  public harvestAmountUnit?: string;

  public locality?: string;
  public latitude?: number;
  public longitude?: number;

  constructor(
    id?: string,
    name?: string,
    phoneNumber?: string,
    products: string[] = [],
    experienceYears?: string,
    experienceYearsUnit?: string,
    landSize?: string,
    landSizeUnit?: string,
    harvestAmount?: string,
    harvestAmountUnit?: string,
    locality?: string,
    latitude?: number,
    longitude?: number
  ) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.products = products;
    this.experienceYears = experienceYears;
    this.experienceYearsUnit = experienceYearsUnit;
    this.landSize = landSize;
    this.landSizeUnit = landSizeUnit;
    this.harvestAmount = harvestAmount;
    this.harvestAmountUnit = harvestAmountUnit;
    this.locality = locality;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
