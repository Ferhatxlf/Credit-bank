import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorlayoutComponent } from './directorlayout/directorlayout.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ListeDossierComponent } from './liste-dossier/liste-dossier.component';
import { MesdossierComponent } from './mesdossier/mesdossier.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: DirectorlayoutComponent,
    children: [
      { path: 'dashboard', component: DashbordComponent },
      { path: 'dossier', component: ListeDossierComponent },
      //{ path: 'mes-dossier', component: MesdossierComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectorRoutingModule {}
