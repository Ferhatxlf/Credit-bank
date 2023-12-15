import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulationRoutingModule } from './simulation-routing.module';
import { ResultsimulationComponent } from './resultsimulation/resultsimulation.component';
import { FormulairesimulationComponent } from './formulairesimulation/formulairesimulation.component';
import { SimulationlayoutComponent } from './simulationlayout/simulationlayout.component';
import { CardsimulationComponent } from './cardsimulation/cardsimulation.component';


@NgModule({
  declarations: [
    ResultsimulationComponent,
    FormulairesimulationComponent,
    SimulationlayoutComponent,
    CardsimulationComponent
  ],
  imports: [
    CommonModule,
    SimulationRoutingModule
  ]
})
export class SimulationModule { }
