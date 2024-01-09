import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { SimulationServiceService } from '../../../service/simulation-service.service';

@Component({
  selector: 'app-detail-credit',
  templateUrl: './detail-credit.component.html',
  styleUrl: './detail-credit.component.css',
})
export class DetailCreditComponent implements OnInit {
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
