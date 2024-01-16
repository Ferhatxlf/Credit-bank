// SimulationComponent.ts
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SharedService } from './shared.service';
import { filter } from 'rxjs/operators';
import { AuthServiceService } from '../service/auth-service.service';
import { SimulationServiceService } from '../service/simulation-service.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css'],
})
export class SimulationComponent implements OnInit {
  toggleOptions: boolean = false;
  isLoged: boolean = false;
  currentUser: any;
  client: any;
  loadingSpinner: boolean = false;

  constructor(
    private location: Location,
    private authService: AuthServiceService,
    private loading: SimulationServiceService
  ) {
    this.url = this.location.path();
    // Écouter les changements d'URL
    this.location.onUrlChange((url) => {
      this.url = url;
      console.log(this.url);
    });
    this.loading.loading$.subscribe((loading) => {
      this.loadingSpinner = loading;
    });
  }
  url: string = '';

  ngOnInit() {
    this.toggleOptions = false;
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }

    if (this.currentUser?.role === 'particulier') {
      this.isLoged = true;
      this.authService.getClient(this.currentUser?.id).subscribe(
        (rs) => {
          this.client = rs;
        },
        (err) => console.log(err)
      );
    }
  }
  setToggleOption() {
    this.toggleOptions = !this.toggleOptions;
  }
  setToggleOptionClose() {
    this.toggleOptions = false;
  }

  goBack(): void {
    this.location.back();
  }

  logout() {
    this.authService.logout();
  }
}
