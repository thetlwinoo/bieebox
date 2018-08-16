import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { Feathers } from '@store/services/feathers.service';

@Injectable()
export class ShopService implements Resolve<any> {

  categories: any[];
  tags: any[];
  servicesandpromotions: any[];
  condition: any[];

  constructor(
    private http: HttpClient
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getCategories({ $limit: 20 }),
        this.getServicesAndPromotionsCag({ $limit: 20 }),
        this.getConditionCag({ $limit: 20 }),
        this.getTagsCag({ $limit: 20 })
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getCategories(query): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('api/categories')
        .subscribe((response: any) => {
          this.categories = response;
          resolve(response);
        }, reject);
    });
  }

  getServicesAndPromotionsCag(query): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('api/servicesandpromotions')
        .subscribe((response: any) => {
          this.servicesandpromotions = response;
          resolve(response);
        }, reject);
    });
  }

  getConditionCag(query): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('api/condition')
        .subscribe((response: any) => {
          this.condition = response;
          resolve(response);
        }, reject);
    });
  }

  getTagsCag(query): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('api/tags')
        .subscribe((response: any) => {
          this.tags = response;
          resolve(response);
        }, reject);
    });
  }
}
