import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { Feathers } from '@box/services/feathers.service';
import { Address } from '@box/models';
import { AuthService } from '@box/services/auth.service';

@Injectable()
export class CheckoutService implements Resolve<any> {

    addresses: Address[];
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
                    $limit: 10
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
            const newQuery = Object.assign(query, { person: this.auth.getCurrentUserId() });
            this.addresses$(newQuery)
                .subscribe((response: any) => {
                    console.log('load add', response)
                    const items: Address[] = [];
                    response.map(item => {
                        const address = new Address(item);
                        items.push(address);
                    });

                    this.addresses = items;

                    this.onAddressesChanged.next(this.addresses);
                    resolve(response);
                }, reject);
        });
    }

    addAddress(address) {
        return new Promise((resolve, reject) => {
            this.addAddress$(address)
                .subscribe((response: any) => {
                    console.log('response', response)
                    this.getAddresses({
                        $limit: 10
                    }).then(addresses => {
                        resolve(addresses);
                    });
                }, reject);
        });
    }

    saveAddress(address) {
        return new Promise((resolve, reject) => {
            this.saveAddress$(address.id, address)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    removeAddress(id) {
        return new Promise((resolve, reject) => {
            this.removeAddress$(id)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    createOrder(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.createOrder$(data)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
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
            .map(d => d.data);
    }

    addAddress$(data: any): Observable<any> {
        console.log(data)
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
            .patch(id, data));
    }

    removeAddress$(id) {
        if (id === '') {
            return;
        }

        return Observable.fromPromise(this.feathers
            .service('general/addresses')
            .remove(id));

        // return of(true);
    }

    createOrder$(data: any): Observable<any> {
        console.log('ccc',data)
        if (data === '') {
            return;
        }

        return Observable.fromPromise(
            this.feathers
                .service('sales/orders')
                .create(data));
    }
}
