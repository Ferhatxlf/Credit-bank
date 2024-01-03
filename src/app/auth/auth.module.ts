import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AuthlayoutComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
