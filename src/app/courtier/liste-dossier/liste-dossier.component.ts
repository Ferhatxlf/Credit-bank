import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedDataService } from '../shared-data.service';
import { CourtierServiceService } from '../../service/courtier-service.service.js';
import { AuthServiceService } from '../../service/auth-service.service.js';
import { GlobalFunctionsService } from '../../service/global-functions.service.js';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-liste-dossier',
  templateUrl: './liste-dossier.component.html',
  styleUrl: './liste-dossier.component.css',
})
export class ListeDossierComponent implements OnInit {
  public router!: Router;
  public searchForm!: FormGroup;
  public Folders!: any;
  public F!: any;
  public searchActivate: boolean = false;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    router: Router,
    private sharedDataService: SharedDataService,
    private courtierService: CourtierServiceService,
    private globalFunctions: GlobalFunctionsService,
    private cdRef: ChangeDetectorRef
  ) {
    this.router = router;
  }
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      numero_dossier: this.fb.control(''),
      nom_projet: this.fb.control(''),
      statut: this.fb.control('NON_TRAITEE'),
    });

    this.getAllFolders();
  }

  getAllFolders() {
    this.courtierService.annoncerLoading(true);

    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
      this.courtierService.getAllDossier(this.currentUser.agence_id).subscribe(
        (rs) => {
          this.Folders = rs;
          this.F = rs;
          console.log('la liste des dossiers', this.Folders);
          this.updateFolderList(this.Folders.length);
          setTimeout(() => {
            this.courtierService.annoncerLoading(false);
          }, 1000);
        },
        (err) => {
          console.log(err);
          setTimeout(() => {
            this.courtierService.annoncerLoading(false);
          }, 1000);
        }
      );
    }
  }

  updateFolderList(length: string) {
    this.courtierService.updateFolderList(length);
  }

  folderClicked(folder) {
    console.log(folder);
    this.router.navigate(['/courtier/detail-dossier', folder.id]);
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

  // affectation(id_dossier) {
  //   this.sharedDataService.affectation(id_dossier);
  //   this.getAllFolders();
  // }
  async affectation(id_dossier) {
    try {
      await this.sharedDataService.affectation(id_dossier);
      this.getAllFolders();
      this.updateFoldersList();
    } catch (error) {
      console.error(error);
    }
  }
  updateFoldersList() {
    this.courtierService.getAllDossier(this.currentUser.agence_id).subscribe(
      (rs) => {
        this.Folders = rs;
        this.F = rs;
        this.cdRef.detectChanges(); // Force la détection des changements
        this.updateFolderList(this.Folders.length);
      },
      (err) => console.log(err)
    );
  }

  status(value) {
    return this.globalFunctions.status(value);
  }
}
