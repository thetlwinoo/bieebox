import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of, throwError } from 'rxjs';
// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { Feathers } from '@box/services/feathers.service';
import { Address } from '@box/models';
import { AuthService } from '@box/services/auth.service';

@Injectable()
export class AddressService {

    addresses: Address[];
    user: any;
    // categories: any[];
    // bannerCategories: any[];
    // brands: any[];
    onAddressesChanged: BehaviorSubject<any> = new BehaviorSubject({});
    onUserChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient,
        private feathers: Feathers,
        private auth: AuthService,
    ) {
    }

    getAddresses(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this.auth.getCurrentAccount().then(user => {
                Object.assign(query, { person: user.id });
                this.addresses$(query)
                    .subscribe((response: any) => {
                        this.addresses = response;
                        this.onAddressesChanged.next(this.addresses);
                        resolve(response);
                    }, reject);
            });
        });
    }

    //feathers API
    addresses$(query): Observable<any[]> {
        console.log('ad store', query)
        return (<any>this.feathers
            .service('general/addresses'))
            .watch()
            .find({
                query: query
            })
            .map(d => {
                const _list: Address[] = [];
                d.data.forEach(element => {
                    const address = new Address(element);
                    _list.push(address);
                });
                return _list;
            });
    }

    addAddress$(data: any): Observable<any> {
        if (data === '') {
            return;
        }

        return Observable.fromPromise(
            this.feathers
                .service('general/addresses')
                .create(data));
    }

    saveAddress$(id: string, data: any): Observable<any> {
        if (data === '') {
            return;
        }

        return Observable.fromPromise(this.feathers
            .service('general/addresses')
            .update(id, data));
    }

    deleteAddress$(id) {
        if (id === '') {
            return;
        }

        this.feathers
            .service('general/addresses')
            .remove(id)

        return of(true);
    }
}