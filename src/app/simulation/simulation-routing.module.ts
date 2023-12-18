// simulation-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimulationComponent } from './simulation.component';
import { FormsComponent } from './forms/forms.component';
import { ResultComponent } from './result/result.component';
import { TypeComponent } from './type/type.component';
import { ConsomationComponent } from './components/consomation/consomation.component';
import { ImmobilierComponent } from './components/immobilier/immobilier.component';
import { PresSurGageComponent } from './components/pres-sur-gage/pres-sur-gage.component';
import { NoticeForRegisterComponent } from './components/notice-for-register/notice-for-register.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './components/upload/upload.component';

const simulationRoutes: Routes = [
  {
    path: '', // Utilisez une chaîne vide ici pour que 'simulation' soit la route principale
    component: SimulationComponent,
    children: [
      { path: '', redirectTo: 'type', pathMatch: 'full' },
      { path: 'form', component: FormsComponent },
      { path: 'result', component: ResultComponent },
      { path: 'type', component: TypeComponent },
      { path: 'notice', component: NoticeForRegisterComponent },
      { path: 'consomation', component: ConsomationComponent },
      { path: 'immobilier', component: ImmobilierComponent },
      { path: 'presurgage', component: PresSurGageComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(simulationRoutes)],
  exports: [RouterModule],
})
export class SimulationRoutingModule {}
