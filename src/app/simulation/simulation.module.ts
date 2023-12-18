// simulation.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulationComponent } from './simulation.component';

import { SimulationRoutingModule } from './simulation-routing.module';
import { FormsComponent } from './forms/forms.component';
import { ResultComponent } from './result/result.component';
import { TypeComponent } from './type/type.component';

import { ImmobilierComponent } from './components/immobilier/immobilier.component';
import { PresSurGageComponent } from './components/pres-sur-gage/pres-sur-gage.component';
import { ConsomationComponent } from './components/consomation/consomation.component';
import { SharedService } from './shared.service';
import { NoticeForRegisterComponent } from './components/notice-for-register/notice-for-register.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './components/upload/upload.component';
import { ConfirmationEmailComponent } from './components/confirmation-email/confirmation-email.component';
import { SuccessComponent } from './components/success/success.component';

@NgModule({
  declarations: [
    FormsComponent,
    ResultComponent,
    TypeComponent,
    ImmobilierComponent,
    PresSurGageComponent,
    ConsomationComponent,
    SimulationComponent,
    NoticeForRegisterComponent,
    RegisterComponent,
    UploadComponent,
    ConfirmationEmailComponent,
    SuccessComponent,
  ],
  imports: [CommonModule, SimulationRoutingModule],
  providers: [SharedService],
})
export class SimulationModule {}
