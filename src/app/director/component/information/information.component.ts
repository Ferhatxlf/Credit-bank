// information.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { SimulationServiceService } from '../../../service/simulation-service.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalFunctionsService } from '../../../service/global-functions.service';

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
    private simulationService: SimulationServiceService,
    private route: ActivatedRoute,
    private globalFunctions: GlobalFunctionsService
  ) {}

  ngOnInit() {
    this.route.parent?.params.subscribe((parentParams) => {
      this.id = parentParams['id'];
    });

    this.simulationService.getDossier(this.id).subscribe(
      (res) => {
        this.folderValue = res;
        console.log(this.folderValue);
      },
      (err) => console.log(err)
    );
  }

  status(value) {
    return this.globalFunctions.status(value);
  }
}
