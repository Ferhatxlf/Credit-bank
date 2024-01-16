import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-islamique-moto',
  templateUrl: './islamique-moto.component.html',
  styleUrl: './islamique-moto.component.css',
})
export class IslamiqueMotoComponent {
  public motos: any = [
    {
      name: 'Scooter Vispa',
      price: 699999,
      url: '../../../../assets/scooter1.png',
    },
    {
      name: 'T-Max 530',
      price: 3990000,
      url: '../../../../assets/scooter2.png',
    },
    {
      name: 'VMS Driver',
      price: 499000,
      url: '../../../../assets/scooter3.png',
    },
  ];
  constructor(private router: Router) {}
  carPrice(price): void {
    console.log(price);
    localStorage.setItem('prix', price);

    this.router.navigate(['/simulation/islamique-form/18']);
  }
}
