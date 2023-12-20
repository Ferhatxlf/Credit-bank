import { Component } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

@Component({
  selector: 'app-mesdossier',
  templateUrl: './mesdossier.component.html',
  styleUrl: './mesdossier.component.css',
})
export class MesdossierComponent {
  public Folders: Array<any> = [
    {
      nom: 'Dossier1',
      courtier: 'Courtier1',
      montantDuPret: 100000,
      categorie: 'Catégorie1',
      completer: true,
    },
    {
      nom: 'Dossier2',
      courtier: 'Courtier2',
      montantDuPret: 100000,
      categorie: 'Catégorie2',
      completer: true,
    },
  ];
}
