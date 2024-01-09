import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedDataService } from '../shared-data.service';
import { CourtierServiceService } from '../../service/courtier-service.service.js';
import { DirectorServiceService } from '../../service/director-service.service.js';

@Component({
  selector: 'app-liste-dossier',
  templateUrl: './liste-dossier.component.html',
  styleUrl: './liste-dossier.component.css',
})
export class ListeDossierComponent implements OnInit {
  public router!: Router;
  public searchForm!: FormGroup;
  public Folders: any = [
    {
      id: 1,
      nomDossier: 'achat dune habitation',
      client: {
        id: 1,
        password:
          '$2a$10$ASDwx9zW2ZiFPhQF63beZ.K727Fjd/ecKHzxzCPFtrjM53chOpzRG',
        email: 'laarbiamroune@gmail.com',
        activated: true,
        createdAt: null,
        civilite: 'Monsieur',
        nom: 'Laarbi',
        prenom: 'Amroune',
        telephone: '2136594969',
        nationalite: 'Algerienne',
        adresse: 'Freha Tizi-Ouzou Algérie',
        ville: 'Freha',
        codePostal: '15012',
        residesInAlgeria: false,
        commune: {
          id: 1,
          nom: 'Freha',
          codePostal: '15012',
          agences: [],
          createdAt: '2024-01-09T01:23:28',
        },
        updatedAt: '2024-01-09T01:26:09',
      },
      typeCredit: 'immobilier',
      typeFinancement: 'immobilier',
      attachedFiles: [
        {
          fileName: '51068867_227106654839103_135195790837547008_n.jpg',
          filePath:
            'C:\\Users\\GLOBAL INFO LAGA\\Desktop\\bank\\CreditDirectBack\\lastbanklend\\CreditDirectbackend\\ClientMicrocervice\\src\\main\\resources\\uploaded-files\\1\\5dc4ceaf-158d-4e15-b1c1-dd18da9b4d62-51068867_227106654839103_135195790837547008_n.jpg',
          fileType: null,
          createdAt: null,
          updatedAt: null,
        },
        {
          fileName: 'a.png',
          filePath:
            'C:\\Users\\GLOBAL INFO LAGA\\Desktop\\bank\\CreditDirectBack\\lastbanklend\\CreditDirectbackend\\ClientMicrocervice\\src\\main\\resources\\uploaded-files\\1\\4d31b893-f159-435e-94c0-9124e4ab2e20-a.png',
          fileType: null,
          createdAt: null,
          updatedAt: null,
        },
        {
          fileName: 'Capture (2).PNG',
          filePath:
            'C:\\Users\\GLOBAL INFO LAGA\\Desktop\\bank\\CreditDirectBack\\lastbanklend\\CreditDirectbackend\\ClientMicrocervice\\src\\main\\resources\\uploaded-files\\1\\98a7bf38-f97d-45a6-8004-7ac9d3c16d24-Capture (2).PNG',
          fileType: null,
          createdAt: null,
          updatedAt: null,
        },
        {
          fileName: 'Capture.JPG',
          filePath:
            'C:\\Users\\GLOBAL INFO LAGA\\Desktop\\bank\\CreditDirectBack\\lastbanklend\\CreditDirectbackend\\ClientMicrocervice\\src\\main\\resources\\uploaded-files\\1\\3697863e-0e04-4620-88af-dee497db2e74-Capture.JPG',
          fileType: null,
          createdAt: null,
          updatedAt: null,
        },
        {
          fileName: 'Capture9.PNG',
          filePath:
            'C:\\Users\\GLOBAL INFO LAGA\\Desktop\\bank\\CreditDirectBack\\lastbanklend\\CreditDirectbackend\\ClientMicrocervice\\src\\main\\resources\\uploaded-files\\1\\f46bc87e-df8d-49e0-8696-c353d245b499-Capture9.PNG',
          fileType: null,
          createdAt: null,
          updatedAt: null,
        },
      ],
      assignedCourtier: null,
      status: 'NON_TRAITEE',
      agenceId: null,
      direction_regionaleId: null,
      montantHabitation: 1.2e7,
      revenueEmprunteur: 100000.0,
      ageEmprunteur: 30,
      creditSouhaite: 8000000.0,
      dureeFinancement: 30,
      revenueCoEmprunteur: 70000.0,
      ageCoEmprunteur: 28,
      montantRevenueImmobilier: null,
      montantAutreRevenue: 0.0,
      montantAutreFinancementEnCours: null,
      createdAt: '2024-01-09T01:25:54',
      updatedAt: '2024-01-09T01:27:09',
    },
  ];
  public F!: any;
  public searchActivate: boolean = false;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    router: Router,
    private sharedDataService: SharedDataService,
    private courtierService: CourtierServiceService,
    private directorService: DirectorServiceService
  ) {
    this.router = router;
  }
  ngOnInit(): void {
    // this.searchForm = this.fb.group({
    //   numero_dossier: this.fb.control(''),
    //   nom_projet: this.fb.control(''),
    //   statut: this.fb.control('NON_TRAITEE'),
    // });
    // const a = localStorage.getItem('currentUser');
    // if (a) {
    //   this.currentUser = JSON.parse(a);
    // }
    // console.log(this.currentUser);
    // this.courtierService.getAllDossier(this.currentUser.agence_id).subscribe(
    //   (rs) => {
    //     this.Folders = rs;
    //     console.log(this.Folders);
    //   },
    //   (err) => console.log(err)
    // );
    // this.F = this.Folders;
  }

  folderClicked(folder) {
    this.sharedDataService.setFolderData(folder);
    this.router.navigate(['/director/component/detail-dossier']);
  }
  search() {
    if (this.searchActivate) {
      this.searchActivate = false;
      this.Folders = this.F;
    } else {
      this.searchActivate = true;
      const numeroDossier = this.searchForm.value.numero_dossier;
      const nomProjet = this.searchForm.value.nom_projet;
      const statut = this.searchForm.value.statut;
      if (numeroDossier != '') {
        this.Folders = this.Folders.filter((f) => f.numero === numeroDossier);
      } else if (nomProjet != '') {
        this.Folders = this.Folders.filter((f) => f.name === nomProjet);
      } else {
        this.Folders = this.Folders.filter((f) => f.statut === statut);
      }
    }
  }
}
