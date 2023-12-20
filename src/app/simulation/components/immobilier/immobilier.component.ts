// ImmobilierComponent.ts
import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-immobilier',
  templateUrl: './immobilier.component.html',
  styleUrls: ['./immobilier.component.css'],
})
export class ImmobilierComponent {
  constructor(private sharedService: SharedService) {}

  envoyerInfo(msg: any) {
    this.sharedService.sendInfo(msg);
  }
}
