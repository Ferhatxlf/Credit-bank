import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourtierlayoutComponent } from './courtierlayout/courtierlayout.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ListeDossierComponent } from './liste-dossier/liste-dossier.component';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: CourtierlayoutComponent,
    children: [
      { path: 'dashboard', component: DashbordComponent },
      { path: 'dossier', component: ListeDossierComponent },
      { path: 'client', component: ListeClientComponent },
      { path: 'detail', component: DetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourtierRoutingModule {}
