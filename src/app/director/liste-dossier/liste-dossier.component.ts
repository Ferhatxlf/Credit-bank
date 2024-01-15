import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedDataService } from '../shared-data.service';
import { CourtierServiceService } from '../../service/courtier-service.service.js';
import { DirectorServiceService } from '../../service/director-service.service.js';
import { AuthServiceService } from '../../service/auth-service.service.js';
import { GlobalFunctionsService } from '../../service/global-functions.service.js';

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
  showModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    router: Router,
    private authService: AuthServiceService,
    private directeurService: DirectorServiceService,
    private globalFunctions: GlobalFunctionsService
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
    this.directeurService
      .getAllDossierForDirector(this.currentUser.agence_id)
      .subscribe(
        (rs) => {
          this.Folders = rs;
          this.F = rs;
          console.log(this.Folders);
        },
        (err) => console.log(err)
      );
  }
  // poour la modale
  toggleShowModale() {
    this.showModal = !this.showModal;
  }

  folderClicked(folder) {
    console.log(folder);
    this.router.navigate([`/director/detail-dossier`, folder.id]);
  }
  search() {
    if (this.searchActivate) {
      this.searchActivate = false;
      this.Folders = this.F;
    } else {
      this.searchActivate = true;
      const statut = this.searchForm.value.statut;
      console.log(statut);
      console.log(this.Folders);
      console.log(this.F);
      this.Folders = this.Folders.filter((f) => f.status === statut);
    }
  }

  acceptFolder(folder) {
    this.directeurService.acceptFolder(folder, '').subscribe(
      (rs) => {
        console.log(rs);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  rejectFolder(folder) {
    this.directeurService
      .rejectFolder(folder.id, '')
      .toPromise()
      .then((rs) => {
        console.log(rs);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renvoiFolder(folder) {
    this.directeurService.renvoiyeFolder(folder.id, '').subscribe(
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
}
