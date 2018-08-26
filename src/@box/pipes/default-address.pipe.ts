import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '@box/models';

@Pipe({
    name: 'default'
})
export class DefaultAddressPipe implements PipeTransform {

    transform(source: Address[]): any {
        if (!source) {
            return source;
        }

        return source.filter(item => item.default === true);
    }

}
