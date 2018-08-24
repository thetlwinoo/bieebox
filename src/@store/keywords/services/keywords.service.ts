import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { Feathers } from '@box/services/feathers.service';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class KeywordsService {
  constructor(
    private http: HttpClient,
    private feathers: Feathers
  ) {
  }

  keywords$(query): Observable<any[]> {
    return (<any>this.feathers
      .service('keywords'))
      .watch()
      .find({
        query: query
      })
      .map(d => d);
  }
}
