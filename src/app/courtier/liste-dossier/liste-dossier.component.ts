import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-liste-dossier',
  templateUrl: './liste-dossier.component.html',
  styleUrl: './liste-dossier.component.css',
})
export class ListeDossierComponent implements OnInit {
  public router!: Router;
  public searchForm!: FormGroup;
  public Folders: Array<any> = [
    {
      numero: 1125,
      name: "Achat d'un véhicule touristique",
      type_financement: 'Consomation',
      montant: 1000000,
      credit: 1000000,
      statut: 'a compléter...',
      duree: '4 années',
      autre_financement: 0,
      courtier: '',
      emprunteur: {
        name: 'KHELF Ferhat',
        age: 28,
        revenu: 100000,
        revenu_coemprunteur: 100000,
        num: '0560...',
        email: 'feraht@gmail.com',
        adresse: 'tizi ouzou',
        etatCivil: 'celebataire',
        type_client: 'Particulier',
      },
    },
    {
      numero: 1126,
      name: "Achat d'un F4",
      type_financement: 'Consomation',
      montant: 1500000,
      credit: 1000000,
      statut: 'complet...',
      duree: '4 années',
      autre_financement: 0,
      courtier: ' AMROUNE Laarbi',
      emprunteur: {
        name: 'TOUZI Mahrez',
        age: 28,
        revenu: 100000,
        revenu_coemprunteur: 0,
        num: '0560...',
        email: 'feraht@gmail.com',
        adresse: 'tizi ouzou',
        etatCivil: 'celebataire',
        type_client: 'Particulier',
      },
    },
  ];
  constructor(
    private fb: FormBuilder,
    router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.router = router;
  }
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      numero_dossier: this.fb.control(''),
      nom_projet: this.fb.control(''),
      statut: this.fb.control('Statut'),
    });
  }

  folderClicked(folder) {
    this.sharedDataService.setFolderData(folder);
    this.router.navigate(['/courtier/detail']);
  }
}
