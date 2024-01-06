import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css',
})
export class DashbordComponent implements OnInit {
  constructor(private sharedData: SharedDataService) {}
  ngOnInit(): void {
    this.sharedData.getAllDossier();
    this.sharedData.getMyFolders();
  }
}
