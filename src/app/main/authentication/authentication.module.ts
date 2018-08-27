import { NgModule } from '@angular/core';
import { LoginModule } from 'app/main/authentication/login/login.module';
import { RegisterModule } from 'app/main/authentication/register/register.module';

@NgModule({
    imports: [
        LoginModule,
        RegisterModule
    ]
})
export class AuthenticationModule {

}