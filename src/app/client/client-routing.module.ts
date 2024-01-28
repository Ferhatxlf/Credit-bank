import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientlayoutComponent } from './clientlayout/clientlayout.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProfileComponent } from './profile/profile.component';
import { MesdossierComponent } from './mesdossier/mesdossier.component';
import { InformationComponent } from './component/information/information.component';
import { DetailCreditComponent } from './component/detail-credit/detail-credit.component';
import { DetailClientComponent } from './component/detail-client/detail-client.component';
import { DocumentComponent } from './component/document/document.component';
import { MonDossierComponent } from './mon-dossier/mon-dossier.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
  {
    path: '',
    component: ClientlayoutComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'dashbord',
        component: DashbordComponent,
      },
      { path: 'dossier', component: MesdossierComponent },
      {
        path: 'detail-dossier/:id',
        component: MonDossierComponent,
        children: [
          { path: '', redirectTo: 'information', pathMatch: 'full' },
          { path: 'information', component: InformationComponent },
          { path: 'detail-credit', component: DetailCreditComponent },
          { path: 'detail-client', component: DetailClientComponent },
          { path: 'document', component: DocumentComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
