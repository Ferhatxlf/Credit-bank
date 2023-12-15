import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulationlayoutComponent } from './simulationlayout/simulationlayout.component';
import { ResultsimulationComponent } from './resultsimulation/resultsimulation.component';
import { CardsimulationComponent } from './cardsimulation/cardsimulation.component';
import { FormulairesimulationComponent } from './formulairesimulation/formulairesimulation.component';

const routes: Routes = [
  {
    path: '',
    component: SimulationlayoutComponent,
    children: [
      { path: 'result', component: ResultsimulationComponent },
      { path: 'card', component: CardsimulationComponent },
      { path: 'formulaire', component: FormulairesimulationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulationRoutingModule {}
