import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourtierRoutingModule } from './courtier-routing.module';
import { CourtierlayoutComponent } from './courtierlayout/courtierlayout.component';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { ListeDossierComponent } from './liste-dossier/liste-dossier.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ComponentModule } from '../component/component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { MesdossierComponent } from './mesdossier/mesdossier.component';
import { MonDossierComponent } from './mon-dossier/mon-dossier.component';
import { InformationComponent } from './component/information/information.component';
import { DetailCreditComponent } from './component/detail-credit/detail-credit.component';
import { DetailClientComponent } from './component/detail-client/detail-client.component';
import { DocumentComponent } from './component/document/document.component';

@NgModule({
  declarations: [
    CourtierlayoutComponent,
    ListeClientComponent,
    ListeDossierComponent,
    DashbordComponent,
    DetailComponent,
    MesdossierComponent,
    MonDossierComponent,
    InformationComponent,
    DetailCreditComponent,
    DetailClientComponent,
    DocumentComponent,
  ],
  imports: [
    CommonModule,
    CourtierRoutingModule,
    ComponentModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CourtierModule {}
