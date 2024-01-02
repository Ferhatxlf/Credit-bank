import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-islamique-vehicule',
  templateUrl: './islamique-vehicule.component.html',
  styleUrl: './islamique-vehicule.component.css',
})
export class IslamiqueVehiculeComponent {
  public cars: any = [
    {
      name: 'CHERY Tiggo 4 pro',
      price: 3990000,
      url: '../../../../assets/tiggo4.png',
    },
    {
      name: 'CHERY Tiggo 2 pro',
      price: 3549000,
      url: '../../../../assets/tiggo2.png',
    },
    {
      name: 'CHERY Arrizo 5',
      price: 3499000,
      url: '../../../../assets/arrizo5.png',
    },
    {
      name: 'FIAT 500x',
      price: 4435000,
      url: '../../../../assets/500x.png',
    },
    {
      name: 'FIAT Tipo',
      price: 3995000,
      url: '../../../../assets/tipo.png',
    },
    {
      name: 'FIAT 500',
      price: 3380000,
      url: '../../../../assets/fiat500.png',
    },
  ];
  constructor(private router: Router) {}
  carPrice(price): void {
    console.log(price);
    localStorage.setItem('prix', price);

    this.router.navigate(['/simulation/islamique-form']);
  }
}
