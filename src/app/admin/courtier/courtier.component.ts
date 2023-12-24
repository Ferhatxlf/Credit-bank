import { Component } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

@Component({
  selector: 'app-courtier',
  templateUrl: './courtier.component.html',
  styleUrl: './courtier.component.css',
})
export class CourtierComponent {
  public Folders: Array<any> = [
    {
      name: 'AMROUNE Laarbi',
      Agence: 'Freha',
      Date: '07-07-1999',
    },
    {
      name: 'KHELF Ferhat',
      Agence: 'Azazga',
      Date: '07-07-1997',
    },
  ];
}
