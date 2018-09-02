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
// import { StockItem } from '@box/models';

@Injectable()
export class MyOrdersService implements Resolve<any> {

  orders: any[];
  onOrdersChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private feathers: Feathers
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getOrders({
          $limit: 10,
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

  getOrders(query): Promise<any> {
    return new Promise((resolve, reject) => {
      this.orders$(query)
        .subscribe((response: any) => {
          this.orders = response;
          console.log(response)
          this.onOrdersChanged.next(this.orders);
          resolve(response);
        }, reject);
    });
  }

  //feathers API
  orders$(query): Observable<any[]> {
    return (<any>this.feathers
      .service('sales/orders'))
      .watch()
      .find({
        query: query
      })
      .map(d => d.data);
  }

}
