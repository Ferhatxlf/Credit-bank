// information.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { SimulationServiceService } from '../../../service/simulation-service.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  @Input() clientName: string = 'moh';
  @Input() clientEmail!: string;

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
