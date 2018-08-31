import { Feathers } from './feathers.service';
// import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { People, Credential } from '@box/models';
import { StorageService } from "@box/services/storage.service";

const CART_KEY = "credentials";

@Injectable()
export class AuthService {
  currentUser: People;
  private storage: Storage;
  onCurrentUserChanged: BehaviorSubject<any> = new BehaviorSubject({});
  constructor(
    private feathers: Feathers,
    // private data: DataService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.storage = this.storageService.get();
  }

  public authenticate(credentials?): Promise<any> {
    return this.feathers.authenticate(credentials);
  }

  // public logIn(credentials?): Observable<any> {
  //   return Observable.fromPromise(
  //     this.authenticate(credentials)
  //   );
  // }

  public save(credential: Credential): void {
    this.storage.setItem(CART_KEY, JSON.stringify(credential));
  }

  public retrieve(): Credential {
    let credential: Credential;
    const cart = this.storage.getItem(CART_KEY);
    if (cart) {
      credential = new Credential(JSON.parse(cart));
    }

    return credential;
  }

  public getCurrentUserId() {
    const credential = this.retrieve();
    return credential.id;
  }

  public getCurrentAccount(email): Promise<any> {
    // const credential = this.retrieve();
    return new Promise((resolve, reject) => {
      this.peoples$(email)
        .subscribe((response: any) => {
          this.currentUser = response;
          this.onCurrentUserChanged.next(this.currentUser);
          resolve(this.currentUser);
        }, reject);
    });
  }

  peoples$(email): Observable<any> {
    return (<any>this.feathers
      .service('general/people'))
      .watch()
      .find({
        query: {
          $limit: 1,
          'emailAddress': email
        }
      })
      .map(d => d.data[0]);
  }

  public logOut() {
    this.feathers.logout();
    // this.router.navigate(['/auth/login']);
  }
}
