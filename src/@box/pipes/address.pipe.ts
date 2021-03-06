import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'addressMinify' })
export class AddressMinifyPipe implements PipeTransform {
    transform(data: null | any) {
        if (!data) {
            return data;
        }

        const name = data.contactName;
        const add1 = data.addressLine1;
        const add2 = data.addressLine2;
        const phno = data.phoneNumber? `(${data.phoneNumber})`: ',';

        return `${name} ${phno} ${add1}, ${add2}`;
    }
}
