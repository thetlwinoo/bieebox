import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BoxConfigService } from '@box/services/config.service';
import { boxAnimations } from '@box/animations';

import { Router } from '@angular/router';
import { AuthService } from '@box/services/auth.service';
import { Feathers } from '@box/services/feathers.service';
import { SnackBarService } from '@box/services/snackbar.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: boxAnimations
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;
  constructor(
    private _boxConfigService: BoxConfigService,
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private _feathers: Feathers,
    private _Router: Router,
    private _snack: SnackBarService,
  ) {
    this._boxConfigService.config = {
      layout: {
        notification: {
          hidden: true
        },
        header: {
          hidden: true
        },
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        },
        shop: {
          hidden: true
        },
        newsletter: {
          hidden: true
        }
      }
    };

    this.loginFormErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      this.loginFormErrors[field] = {};

      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (!email || !password) {
      this.sendMessage('Incomplete credentials!');
      return;
    }

    this.auth.authenticate({
      strategy: 'local',
      email,
      password
    })
      .then((res) => {
        this.auth.save({email: email});
        this._Router.navigate(['/pages/checkout']);
      })
      .catch(err => {
        this.sendMessage('Wrong credentials!')
      });
  }

  signup(email: string, password: string) {
    // this._Feathers.service('users')
    //   .create({ email, password })
    //   .then(() => this.sendMessage('User created.'))
    //   .catch(err => this.sendMessage('Could not create user!'))
    //   ;
  }

  sendMessage(message: string): void {
    this._snack.sendMessage(message);
  }

  clearMessage(): void {
    this._snack.clearMessage();
  }
}
