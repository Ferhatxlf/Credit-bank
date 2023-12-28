import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consomation',
  templateUrl: './consomation.component.html',
  styleUrl: './consomation.component.css',
})
export class ConsomationComponent {
  constructor(private router: Router) {}
  consomationType(typeName): void {
    // Enregistrez la variable dans localStorage
    localStorage.setItem('consomationType', typeName);
    this.router.navigate(['/simulation/form']);
  }
}
