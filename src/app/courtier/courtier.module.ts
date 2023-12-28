import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourtierRoutingModule } from './courtier-routing.module';
import { CourtierlayoutComponent } from './courtierlayout/courtierlayout.component';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { ListeDossierComponent } from './liste-dossier/liste-dossier.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ComponentModule } from '../component/component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    CourtierlayoutComponent,
    ListeClientComponent,
    ListeDossierComponent,
    DashbordComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    CourtierRoutingModule,
    ComponentModule,
    ReactiveFormsModule,
  ],
})
export class CourtierModule {}
