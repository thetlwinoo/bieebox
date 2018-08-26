import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { EllipsisPipe } from './ellipsis.pipe';
import { AddCommasPipe } from './add-commas.pipe';
import { AddressMinifyPipe } from './address.pipe';
import { DefaultAddressPipe } from './default-address.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        EllipsisPipe,
        AddCommasPipe,
        AddressMinifyPipe,
        DefaultAddressPipe
    ],
    imports     : [],
    exports     : [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        EllipsisPipe,
        AddCommasPipe,
        AddressMinifyPipe,
        DefaultAddressPipe
    ]
})
export class BoxPipesModule
{
}
