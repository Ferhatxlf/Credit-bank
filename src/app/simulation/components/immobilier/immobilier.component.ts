// ImmobilierComponent.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-immobilier',
  templateUrl: './immobilier.component.html',
  styleUrls: ['./immobilier.component.css'],
})
export class ImmobilierComponent {
  constructor(private router: Router) {}
  immobilierType(typeName): void {
    // Enregistrez la variable dans localStorage
    localStorage.setItem('immobilierType', typeName);
    this.router.navigate(['/simulation/form']);
  }
}
