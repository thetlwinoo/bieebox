import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Feathers } from './feathers.service';
import { BoxUtils } from '@box/utils';

@Injectable()
export class PhotoService {
    images: any[];

    onImagesChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private feathers: Feathers) { }

    // getImages(stockItemId): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.images$(stockItemId)
    //             .subscribe((response: any) => {
    //                 this.images = response;
    //                 this.onImagesChanged.next(response);
    //                 resolve(response);
    //             }, reject);
    //     });
    // }

    images$(stockItemId): Observable<any> {
        console.log('eeee', stockItemId)
        return (<any>this.feathers
            .service('general/photos'))
            .watch()
            .find(
                {
                    query: {
                        $limit: 20,
                        "stockItemId": stockItemId,
                        "isThumbnail": false
                    }
                }
            )
            .map(d => {
                this.onImagesChanged.next(d.data);
                return d.data;
            });

    }
}
