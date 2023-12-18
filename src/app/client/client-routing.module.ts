import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientlayoutComponent } from './clientlayout/clientlayout.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProfileComponent } from './profile/profile.component';
import { MesdossierComponent } from './mesdossier/mesdossier.component';
import { NouveaucreditComponent } from './nouveaucredit/nouveaucredit.component';

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
      { path: 'nouveau-credit', component: NouveaucreditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
