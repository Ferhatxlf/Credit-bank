import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedDataService } from '../shared-data.service';
import { CourtierServiceService } from '../../service/courtier-service.service.js';
import { AuthServiceService } from '../../service/auth-service.service.js';
import { GlobalFunctionsService } from '../../service/global-functions.service.js';
import { DirectorServiceService } from '../../service/director-service.service.js';
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
  showModal: boolean = false;
  idDossier: any;
  comment: any;

  constructor(
    private fb: FormBuilder,
    router: Router,
    private authService: AuthServiceService,
    private courtierService: CourtierServiceService,
    private globalFunctions: GlobalFunctionsService,
    private directeurService: DirectorServiceService
  ) {
    this.router = router;
  }
  // poour la modale
  toggleShowModale(id) {
    this.showModal = !this.showModal;
    this.idDossier = id;
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      numero_dossier: this.fb.control(''),
      nom_projet: this.fb.control(''),
      statut: this.fb.control('TRAITEMENT_ENCOURS'),
    });

    this.courtierService.annoncerLoading(true);
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    console.log(this.currentUser);
    this.courtierService.getAllMyFolders(this.currentUser.id).subscribe(
      (rs) => {
        this.Folders = rs;
        this.Folders = this.Folders.filter(
          (f) => f.status !== 'ACCEPTER' && f.status !== 'REFUSER'
        );
        this.F = this.Folders;
        console.log(this.Folders);
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

  folderClicked(folder) {
    this.router.navigate(['/courtier/detail-dossier', folder.id]);
    console.log(folder);
  }
  updateSelectedFolders() {
    this.selectedFolders = this.Folders.filter(
      (folder) => folder.isSelected
    ).map((folder) => folder.id);
    console.log('selecteur folderr', this.selectedFolders);
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

  status(value) {
    return this.globalFunctions.status(value);
  }

  addComment() {
    this.directeurService
      .addComment(this.comment, this.idDossier)
      .subscribe((rs) => {
        console.log(rs);
      });
  }
}
