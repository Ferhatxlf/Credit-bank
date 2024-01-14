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
import { ConfirmationEmailComponent } from './components/confirmation-email/confirmation-email.component';
import { SuccessComponent } from './components/success/success.component';
import { IslamiqueComponent } from './components/islamique/islamique.component';
import { FormConsomationComponent } from './components/form-consomation/form-consomation.component';
import { IslamiqueVehiculeComponent } from './components/islamique-vehicule/islamique-vehicule.component';
import { IslamiqueFormComponent } from './components/islamique-form/islamique-form.component';
import { IslamiqueMotoComponent } from './components/islamique-moto/islamique-moto.component';

const simulationRoutes: Routes = [
  {
    path: '', // Utilisez une chaîne vide ici pour que 'simulation' soit la route principale
    component: SimulationComponent,
    children: [
      { path: '', redirectTo: 'type', pathMatch: 'full' },
      { path: 'form/:id', component: FormsComponent },
      { path: 'result', component: ResultComponent },
      { path: 'type', component: TypeComponent },
      { path: 'notice', component: NoticeForRegisterComponent },
      { path: 'consomation', component: ConsomationComponent },
      { path: 'immobilier', component: ImmobilierComponent },
      { path: 'presurgage', component: PresSurGageComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'confirmation', component: ConfirmationEmailComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'islamique', component: IslamiqueComponent },
      { path: 'formConsomation/:id', component: FormConsomationComponent },
      { path: 'islamique-vehicule', component: IslamiqueVehiculeComponent },
      { path: 'islamique-moto', component: IslamiqueMotoComponent },
      { path: 'islamique-form/:id', component: IslamiqueFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(simulationRoutes)],
  exports: [RouterModule],
})
export class SimulationRoutingModule {}
