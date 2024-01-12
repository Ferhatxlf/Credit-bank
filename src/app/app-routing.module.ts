import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourtierGardService } from './guardiens/courtier-gard.service';
import { DirecteurGardService } from './guardiens/directeur-gard.service';
import { AdminGardService } from './guardiens/admin-gard.service';
import { ClientGardService } from './guardiens/client-gard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'client',
    canActivate: [ClientGardService],
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'admin',
    canActivate: [AdminGardService],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'courtier',
    canActivate: [CourtierGardService],
    loadChildren: () =>
      import('./courtier/courtier.module').then((m) => m.CourtierModule),
  },
  {
    path: 'simulation',
    loadChildren: () =>
      import('./simulation/simulation.module').then((m) => m.SimulationModule),
  },
  {
    path: 'director',
    canActivate: [DirecteurGardService],
    loadChildren: () =>
      import('./director/director.module').then((m) => m.DirectorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
