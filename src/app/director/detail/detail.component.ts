import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { DirectorServiceService } from '../../service/director-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  folderValue: any;
  haveCourtier: boolean = false;
  constructor(
    private location: Location,
    private sharedDataService: SharedDataService,
    private directorService: DirectorServiceService
  ) {
    this.url = this.location.path();
  }

  url: string = '';

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.folderValue = this.sharedDataService.getFolderData();
  }

  afectation(id_dossier) {
    this.sharedDataService.affectation(id_dossier);
  }
}
