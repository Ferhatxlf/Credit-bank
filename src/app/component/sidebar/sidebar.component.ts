import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private router: Router) {}
  navigateDash() {
    this.router.navigate(['/client/dashbord']);
  }
  navigateProfile() {
    this.router.navigate(['/client/profile']);
  }
  navigateCredit() {
    this.router.navigate(['/client/nouveau-credit']);
  }
  navigateDossier() {
    this.router.navigate(['/client/dossier']);
  }
}
