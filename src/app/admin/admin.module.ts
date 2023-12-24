import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CourtierComponent } from './courtier/courtier.component';
import { DirecteurComponent } from './directeur/directeur.component';
import { InformationComponent } from './information/information.component';

@NgModule({
  declarations: [DashbordAdminComponent, AdminLayoutComponent, CourtierComponent, DirecteurComponent, InformationComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
