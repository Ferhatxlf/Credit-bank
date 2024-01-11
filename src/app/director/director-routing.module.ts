import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorlayoutComponent } from './directorlayout/directorlayout.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ListeDossierComponent } from './liste-dossier/liste-dossier.component';
import { MesdossierComponent } from './mesdossier/mesdossier.component';
import { MonDossierComponent } from './mon-dossier/mon-dossier.component';
import { InformationComponent } from './component/information/information.component';
import { DetailCreditComponent } from './component/detail-credit/detail-credit.component';
import { DetailClientComponent } from './component/detail-client/detail-client.component';
import { DocumentComponent } from './component/document/document.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: DirectorlayoutComponent,
    children: [
      { path: 'dashboard', component: DashbordComponent },
      { path: 'dossier', component: ListeDossierComponent },
      {
        path: 'detail-dossier',
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
export class DirectorRoutingModule {}
