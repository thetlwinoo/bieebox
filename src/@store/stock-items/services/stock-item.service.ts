import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { Feathers } from '@store/services/feathers.service';
import * as _ from 'lodash';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { StockItem } from '@box/models';

@Injectable()
export class StockItemsService implements Resolve<any> {

  stockItems: any[];
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
          $limit: 20,
          $skip: 0
        })
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
          // response.forEach(element => {
          //   const _stockItem = new StockItem(element);
          //   this.stockItems.push(_stockItem);
          // });
          this.onStockItemsChanged.next(this.stockItems);
          resolve(response);
        }, reject);
    });
  }

  //feathers API
  stockItems$(query): Observable<any[]> {
    return (<any>this.feathers
      .service('search'))
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

        d.data = _list;        
        return d;
      });
  }

  stockItem$(id): Observable<any> {
    return (<any>this.feathers
      .service('warehouse/stock-items'))
      .watch()
      .get(id)
      .map(d=>{
        const _stockItem: StockItem = new StockItem(d);
        return _stockItem;
      });
  }

  deleteStockItem$(id) {
    if (id === '') {
      return;
    }

    this.feathers
      .service('warehouse/stock-items')
      .remove(id)
  }
  //end feathers API
}
