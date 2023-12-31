import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-islamique-vehicule',
  templateUrl: './islamique-vehicule.component.html',
  styleUrl: './islamique-vehicule.component.css',
})
export class IslamiqueVehiculeComponent {
  constructor(private router: Router) {}
  carPrice(price): void {
    console.log(price);
    localStorage.setItem('prix', price);

    this.router.navigate(['/simulation/islamique-form']);
  }
}
