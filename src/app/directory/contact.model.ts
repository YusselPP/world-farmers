export class Contact {

  constructor(
    public name?: string,
    public phoneNumber?: string,

    public products?: string[],
    public experienceYears?: string,
    public landSize?: string,
    public harvestAmount?: string,

    public locality?: string,
    public latitude?: number,
    public longitude?: number
  ) {}
}
