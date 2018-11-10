import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoxConfigService } from '@box/services/config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit,OnDestroy {
    boxConfig: any;
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     */
    constructor(
        private _boxConfigService: BoxConfigService,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this._boxConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.boxConfig = settings;
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    hideNewsletter() : void
    {
        this.boxConfig.layout.newsletter.hidden = true;
    }
}
