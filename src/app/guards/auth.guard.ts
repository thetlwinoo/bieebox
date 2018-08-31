import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '@box/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth
            .authenticate()
            .then((e) => true)
            .catch(() => {
                this.router.navigate(['/auth/login']);
                return false;
            });
    }
}
