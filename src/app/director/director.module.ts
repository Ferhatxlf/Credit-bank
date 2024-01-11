import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorRoutingModule } from './director-routing.module';
import { DirectorlayoutComponent } from './directorlayout/directorlayout.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ListeDossierComponent } from './liste-dossier/liste-dossier.component';
import { MesdossierComponent } from './mesdossier/mesdossier.component';
import { MonDossierComponent } from './mon-dossier/mon-dossier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DetailClientComponent } from './component/detail-client/detail-client.component';
import { DetailCreditComponent } from './component/detail-credit/detail-credit.component';
import { DocumentComponent } from './component/document/document.component';
import { InformationComponent } from './component/information/information.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    DirectorlayoutComponent,
    DashbordComponent,
    ListeDossierComponent,
    MesdossierComponent,
    MonDossierComponent,

    DetailClientComponent,
    DetailCreditComponent,
    DocumentComponent,
    InformationComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    DirectorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DirectorModule {}