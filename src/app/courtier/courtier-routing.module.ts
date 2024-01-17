import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourtierlayoutComponent } from './courtierlayout/courtierlayout.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ListeDossierComponent } from './liste-dossier/liste-dossier.component';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { DetailComponent } from './detail/detail.component';
import { MesdossierComponent } from './mesdossier/mesdossier.component';
import { MonDossierComponent } from './mon-dossier/mon-dossier.component';
import { InformationComponent } from './component/information/information.component';
import { DetailCreditComponent } from './component/detail-credit/detail-credit.component';
import { DetailClientComponent } from './component/detail-client/detail-client.component';
import { DocumentComponent } from './component/document/document.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { DossierFinalisesComponent } from './dossier-finalises/dossier-finalises.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: CourtierlayoutComponent,
    children: [
      { path: 'dashboard', component: DashbordComponent },
      { path: 'dossier', component: ListeDossierComponent },
      { path: 'mes-dossier', component: MesdossierComponent },
      { path: 'client', component: ListeClientComponent },
      { path: 'detail', component: DetailComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'notif', component: NotificationComponent },
      { path: 'dossier-finalise', component: DossierFinalisesComponent },
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
export class CourtierRoutingModule {}
