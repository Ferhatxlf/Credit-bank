import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProfileComponent } from './profile/profile.component';
import { ClientlayoutComponent } from './clientlayout/clientlayout.component';
import { ComponentModule } from '../component/component.module';
import { MesdossierComponent } from './mesdossier/mesdossier.component';
import { NouveaucreditComponent } from './nouveaucredit/nouveaucredit.component';

@NgModule({
  declarations: [DashbordComponent, ProfileComponent, ClientlayoutComponent, MesdossierComponent, NouveaucreditComponent],
  imports: [CommonModule, ClientRoutingModule, ComponentModule],
})
export class ClientModule {}
