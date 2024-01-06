import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { CourtierComponent } from './courtier/courtier.component';
import { DirecteurComponent } from './directeur/directeur.component';
import { InformationComponent } from './information/information.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashbordAdmin', pathMatch: 'full' },

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
    
      {
        path: 'dashbordAdmin',
        component: DashbordAdminComponent,
      },
      {
        path: 'courtier',
        component: CourtierComponent,
      },
      {
        path: 'directeur',
        component: DirecteurComponent,
      },
      {
        path: 'information',
        component: InformationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
