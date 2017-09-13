export class Contact {
  public static landSizeUnits = {'HA': 'Hectáreas'};
  public static landSizeUnitsKeys = Object.keys(Contact.landSizeUnits);
  public static harvestAmountUnits = {'KG': 'Kilos', 'TON': 'Toneladas'};
  public static harvestAmountUnitsKeys = Object.keys(Contact.harvestAmountUnits);

  public id?: string;
  public name?: string;
  public phoneNumber?: string;

  public products: string[];

  public startedWorking?: string;

  public landSize?: string;
  public landSizeUnit?: string;

  public harvestAmount?: string;
  public harvestAmountUnit?: string;

  public locality?: string;
  public latitude?: number;
  public longitude?: number;

  constructor(options?) {
    if (!options) {
      options = {};
    }
    this.id = options.id;
    this.name = options.name;
    this.phoneNumber = options.phoneNumber;

    this.startedWorking = options.startedWorking;

    this.landSize = options.landSize;
    this.landSizeUnit = options.landSizeUnit;

    this.harvestAmount = options.harvestAmount;
    this.harvestAmountUnit = options.harvestAmountUnit;

    this.locality = options.locality;
    this.latitude = options.latitude;
    this.longitude = options.longitude;

    this.products = Contact.productsStringToArray(options.products);
  }

  static productsStringToArray(products: string | string[]): string[] {
    let parsedProducts;

    if (products instanceof Array) {
      return products;
    }

    if (typeof products === 'string') {
      parsedProducts = products.split(',').map(s => s.trim());
    } else {
      parsedProducts = [];
    }
    return parsedProducts;
  }

  public getExperience(): string {
    const d2 = new Date(Date.now());
    let months;
    let years;
    let experience = '';

    if (!this.startedWorking) {
      return experience;
    }

    const d1 = new Date(this.startedWorking);

    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    months = months <= 0 ? 0 : months;

    years = Math.trunc(months / 12);
    months = Math.trunc(months % 12);

    if (years === 1) {
      experience += years + ' año ';
    } else if (years > 1) {
      experience += years + ' años ';
    }

    if (months === 1) {
      experience += months + ' mes';
    } else if (months > 1) {
      experience += months + ' meses';
    }

    return experience;
  }
}
