import { Component } from '@angular/core';

import { BoxTranslationLoaderService } from '@box/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{
    /**
     * Constructor
     *
     * @param {BoxTranslationLoaderService} _boxTranslationLoaderService
     */
    constructor(
        private _boxTranslationLoaderService: BoxTranslationLoaderService
    )
    {
        this._boxTranslationLoaderService.loadTranslations(english, turkish);
    }
}
