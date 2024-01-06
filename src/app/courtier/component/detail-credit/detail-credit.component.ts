import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';

@Component({
  selector: 'app-detail-credit',
  templateUrl: './detail-credit.component.html',
  styleUrl: './detail-credit.component.css',
})
export class DetailCreditComponent implements OnInit {
  folderValue: any;

  constructor(private sharedDataService: SharedDataService) {}
  ngOnInit() {
    this.folderValue = this.sharedDataService.getFolderData();
  }
}
