import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { Feathers } from '@store/services/feathers.service';

@Injectable()
export class DeliveryService implements Resolve<any> {

  deliveryOptions: any[];
  onDeliveryOptionsChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private feathers: Feathers
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
        this.getDeliveryOptions({
          $limit: 20
        }),
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getDeliveryOptions(query): Promise<any> {
    return new Promise((resolve, reject) => {
      this.deliveryOptions$(query)
        .subscribe((response: any) => {
          this.deliveryOptions = response;
          console.log(response)
          this.onDeliveryOptionsChanged.next(this.deliveryOptions);
          resolve(response);
        }, reject);
    });
  }  

  //feathers API
  deliveryOptions$(query): Observable<any[]> {
    return (<any>this.feathers
      .service('general/delivery-options'))
      .watch()
      .find({
        query: query
      })
      .map(d => d.data);
  }
}