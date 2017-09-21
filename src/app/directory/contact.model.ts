import { isArray, isString } from 'util';

export class Contact {
  public static landSizeUnits = {'HA': 'Hectáreas'};
  public static landSizeUnitsKeys = Object.keys(Contact.landSizeUnits);
  public static harvestAmountUnits = {'KG': 'Kilos', 'TON': 'Toneladas'};
  public static harvestAmountUnitsKeys = Object.keys(Contact.harvestAmountUnits);

  public id?: number;
  public name?: string;
  public phoneNumber?: string;

  public products: string[];

  public startedWorking?: string;

  public landSize?: number;
  public landSizeUnit?: string;

  public harvestAmount?: number;
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

    this.landSize = +options.landSize || undefined;
    this.landSizeUnit = options.landSizeUnit;

    this.harvestAmount = +options.harvestAmount || undefined;
    this.harvestAmountUnit = options.harvestAmountUnit;

    this.locality = options.locality;
    this.latitude = +options.latitude || undefined;
    this.longitude = +options.longitude || undefined;

    this.products = Contact.productsStringToArray(options.products);
  }

  static productsStringToArray(products: string[] | string): string[] {
    let parsedProducts;

    if (Array.isArray(products)) {
      return products;
    }

    if (isString(products)) {
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
      return 'Sin experiencia';
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

    if (experience === '') {
      return 'Menos de 1 mes';
    }

    return experience;
  }

  public getLandSizeUnitText(): string {
    return Contact.landSizeUnits[this.landSizeUnit];
  }

  public getHarvestAmountUnitText(): string {
    return Contact.harvestAmountUnits[this.harvestAmountUnit];
  }
}
