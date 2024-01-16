import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CourtierComponent } from './courtier/courtier.component';
import { DirecteurComponent } from './directeur/directeur.component';
import { InformationComponent } from './information/information.component';
import { ComponentModule } from '../component/component.module';
import { AgenceRegionnaleComponent } from './agenceRegionnale/agence-regionnale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgenceInfoComponent } from './agence-info/agence-info.component';
import { ModalComponent } from './component/modal/modal.component';


@NgModule({
  declarations: [
    DashbordAdminComponent,
    AdminLayoutComponent,
    CourtierComponent,
    DirecteurComponent,
    InformationComponent,
    AgenceRegionnaleComponent,
    AgenceInfoComponent,
    ModalComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
