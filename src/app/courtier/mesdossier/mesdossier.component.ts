import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedDataService } from '../shared-data.service';
@Component({
  selector: 'app-mesdossier',
  templateUrl: './mesdossier.component.html',
  styleUrl: './mesdossier.component.css',
})
export class MesdossierComponent {
  public router!: Router;
  public searchForm!: FormGroup;
  public Folders!: Array<any>;
  public F!: Array<any>;
  public searchActivate: boolean = false;

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
      statut: this.fb.control('complet'),
    });

    this.Folders = this.sharedDataService.mesDossier;
    this.F = this.sharedDataService.mesDossier;
  }

  folderClicked(folder) {
    this.sharedDataService.setFolderData(folder);
    this.router.navigate(['/courtier/detail-dossier']);
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
