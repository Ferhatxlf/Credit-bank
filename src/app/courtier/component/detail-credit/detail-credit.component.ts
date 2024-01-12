import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { SimulationServiceService } from '../../../service/simulation-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-credit',
  templateUrl: './detail-credit.component.html',
  styleUrl: './detail-credit.component.css',
})
export class DetailCreditComponent implements OnInit {
  folderValue: any;
  id: any;

  constructor(
    private simulationService: SimulationServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent?.params.subscribe((parentParams) => {
      this.id = parentParams['id'];
    });
    this.simulationService.getDossier(this.id).subscribe(
      (res) => {
        this.folderValue = res;
      },
      (err) => console.log(err)
    );
  }
}
