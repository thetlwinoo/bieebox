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
import { StockItem } from '@box/models';

@Injectable()
export class CheckoutCompletedService implements Resolve<any> {

  stockItems: StockItem[];
  onStockItemsChanged: BehaviorSubject<any> = new BehaviorSubject({});

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
        this.getStockItems({
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

  getStockItems(query): Promise<any> {
    // this.stockItems = [];
    return new Promise((resolve, reject) => {
      this.stockItems$(query)
        .subscribe((response: any) => {
          this.stockItems = response;
          this.onStockItemsChanged.next(this.stockItems);
          resolve(response);
        }, reject);
    });
  }

  //feathers API
  stockItems$(query): Observable<any[]> {
    return (<any>this.feathers
      .service('warehouse/stock-items'))
      .watch()
      .find({
        query: query
      })
      .map(d => {
        const _list: StockItem[] = [];    
        d.data.forEach(element => {
          const _stockItem = new StockItem(element);
          _list.push(_stockItem);
        });
        console.log(_list)
        return _list;
      });
  }

}
