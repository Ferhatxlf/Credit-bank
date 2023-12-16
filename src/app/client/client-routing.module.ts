import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientlayoutComponent } from './clientlayout/clientlayout.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
  {
    path: '',
    component: ClientlayoutComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'dashbord', component: DashbordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
