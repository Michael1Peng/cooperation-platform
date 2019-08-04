import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
})
export class LoginModule {
}
