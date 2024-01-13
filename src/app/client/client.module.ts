import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProfileComponent } from './profile/profile.component';
import { ClientlayoutComponent } from './clientlayout/clientlayout.component';
import { ComponentModule } from '../component/component.module';
import { MesdossierComponent } from './mesdossier/mesdossier.component';
import { NouveaucreditComponent } from './nouveaucredit/nouveaucredit.component';
import { InformationComponent } from './component/information/information.component';
import { DetailCreditComponent } from './component/detail-credit/detail-credit.component';
import { DetailClientComponent } from './component/detail-client/detail-client.component';
import { DocumentComponent } from './component/document/document.component';
import { MonDossierComponent } from './mon-dossier/mon-dossier.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    DashbordComponent,
    ProfileComponent,
    ClientlayoutComponent,
    MesdossierComponent,
    NouveaucreditComponent,
    InformationComponent,
    DetailClientComponent,
    DetailCreditComponent,
    DocumentComponent,
    MonDossierComponent,
  ],
  imports: [CommonModule, ClientRoutingModule, ComponentModule],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
})
export class ClientModule {}
