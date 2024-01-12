import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedDataService } from '../shared-data.service';
import { CourtierServiceService } from '../../service/courtier-service.service.js';
@Component({
  selector: 'app-mesdossier',
  templateUrl: './mesdossier.component.html',
  styleUrl: './mesdossier.component.css',
})
export class MesdossierComponent {
  public router!: Router;
  public searchForm!: FormGroup;
  public Folders!: any;
  public F!: any;
  public searchActivate: boolean = false;
  currentUser: any;
  selectedFolders: any[] = [];
  FoldersTraite!: any;

  constructor(
    private fb: FormBuilder,
    router: Router,
    private sharedDataService: SharedDataService,
    private courtierService: CourtierServiceService
  ) {
    this.router = router;
  }
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      numero_dossier: this.fb.control(''),
      nom_projet: this.fb.control(''),
      statut: this.fb.control('NON_TRAITEE'),
    });

    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    console.log(this.currentUser);
    this.courtierService.getDossierEncours(this.currentUser.id).subscribe(
      (rs) => {
        this.Folders = rs;
        this.F = rs;
        console.log(this.Folders);
      },
      (err) => console.log(err)
    );

    this.courtierService.getDossierTraite(this.currentUser.id).subscribe(
      (rs) => {
        this.FoldersTraite = rs;
        console.log(this.FoldersTraite);
      },
      (err) => console.log(err)
    );

    this.F = this.Folders;
  }

  folderClicked(folder) {
    this.router.navigate(['/courtier/detail-dossier', folder.id]);
    console.log(folder);
  }
  updateSelectedFolders() {
    this.selectedFolders = this.Folders.filter(
      (folder) => folder.isSelected
    ).map((folder) => folder.id);
    console.log(this.selectedFolders);
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

  soumettreDossier() {
    this.courtierService
      .soumettereDossierADirecteur(this.selectedFolders)
      .subscribe(
        (rs) => {
          console.log(rs);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
