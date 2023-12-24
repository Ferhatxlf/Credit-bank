import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { Component } from '@angular/core';

@Component({
  selector: 'app-directeur',
  templateUrl: './directeur.component.html',
  styleUrl: './directeur.component.css',
})
export class DirecteurComponent {
  public Folders: Array<any> = [
    {
      name: 'TOUZI Mahrez',
      Agence: 'DBK',
      Date: '07-07-1994',
    },
    {
      name: 'HAMNACHE Krim Belkacem',
      Agence: 'Tizi Ouzou',
      Date: '07-07-1995',
    },
  ];
}
