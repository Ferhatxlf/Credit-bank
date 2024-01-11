import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { SimulationServiceService } from '../../../service/simulation-service.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.css',
})
export class DetailClientComponent implements OnInit {
  folderValue: any;
  id: any;

  constructor(
    private sharedData: SharedDataService,
    private simulationService: SimulationServiceService
  ) {}

  ngOnInit() {
    const a = localStorage.getItem('idDossier');
    if (a) {
      this.id = JSON.parse(a);
    }
    this.simulationService.getDossier(this.id).subscribe(
      (res) => {
        this.folderValue = res;
      },
      (err) => console.log(err)
    );
  }
}