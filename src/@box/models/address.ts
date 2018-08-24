import { BoxUtils } from '@box/utils';

export class Address {
    id: string;
    people: string;
    addressType: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateProvince: string;
    country: string;
    geoLocation: string;
    postalCode: string;
    lastEditedBy: string;
    validFrom: Date;
    validTo: Date;

    constructor(address?) {
        address = address || {};
        this.id = address.id || address._id || BoxUtils.generateGUID();
        this.people = address.people || '';
        this.addressType = address.addressType || '';
        this.addressLine1 = address.addressLine1 || '';
        this.addressLine2 = address.addressLine2 || '';
        this.city = address.city || {};
        this.stateProvince = address.stateProvince || '';
        this.country = address.country || '';
        this.geoLocation = address.geoLocation || '';
        this.postalCode = address.postalCode || '';
        this.lastEditedBy = address.lastEditedBy || '';
        this.validFrom = address.validFrom || new Date('2018-01-01 00:00:00.0000000');
        this.validTo = address.validTo || new Date('9999-12-31 23:59:59.9999999');
    }
}

export class AddressUpdate {
    id: string;
    changes: Address;
}