import { Feathers } from '@store/services/feathers.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { User } from './auth.model';
/**
 * Abstraction layer for auth. Nice to have when things get more complicated.
 */
@Injectable()
export class AuthService {

    constructor(
        private feathers: Feathers,
        private router: Router
    ) { }

    public authenticate(credentials?): Promise<any> {
        return this.feathers.authenticate(credentials);
    }

    public logIn(credentials?): Observable<any> {
        return Observable.fromPromise(
            this.authenticate(credentials)
        );
    }

    public logOut() {
        this.feathers.logout();
        this.router.navigate(['/auth/login']);
    }
}
