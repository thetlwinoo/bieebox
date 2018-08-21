import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';

@Injectable()
export class HeaderService implements Resolve<any> {

  defaultKeywords: any[];

  constructor(
    private http: HttpClient
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getDefaultKeywords({ $limit: 20 })
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getDefaultKeywords(query): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('api/default_keywords')
        .subscribe((response: any) => {
          this.defaultKeywords = response;
          console.log('header',response)
          resolve(response);
        }, reject);
    });
  }  
}
