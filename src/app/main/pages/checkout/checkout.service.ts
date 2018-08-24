import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { Feathers } from '@box/services/feathers.service';
import { Address } from '@box/models';
import { AuthService } from '@box/services/auth.service';

@Injectable()
export class CheckoutService implements Resolve<any> {

    addresses: Address[];
    // categories: any[];
    // bannerCategories: any[];
    // brands: any[];
    onAddressesChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient,
        private feathers: Feathers,
        private auth: AuthService,
    ) {
    }

    /**
       * Resolve
       * @param {ActivatedRouteSnapshot} route
       * @param {RouterStateSnapshot} state
       * @returns {Observable<any> | Promise<any> | any}
       */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getAddresses({
                    $limit: 20,
                    $skip: 0
                }),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getAddresses(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this.auth.getCurrentAccount().then(user => {
                const newQuery = Object.assign({ person: user.id }, query);
                this.addresses$(newQuery)
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
}
