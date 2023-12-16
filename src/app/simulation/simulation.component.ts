import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.css',
})
export class SimulationComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
