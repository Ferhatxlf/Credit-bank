import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProfileComponent } from './profile/profile.component';
import { ClientlayoutComponent } from './clientlayout/clientlayout.component';


@NgModule({
  declarations: [
    DashbordComponent,
    ProfileComponent,
    ClientlayoutComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
