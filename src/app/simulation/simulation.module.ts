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

@NgModule({
  declarations: [
    FormsComponent,
    ResultComponent,
    TypeComponent,
    ImmobilierComponent,
    PresSurGageComponent,
    ConsomationComponent,
    SimulationComponent,
  ],
  imports: [CommonModule, SimulationRoutingModule],
  providers: [SharedService],
})
export class SimulationModule {}
