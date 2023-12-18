import { Component } from '@angular/core';
import { Router } from '@angular/router';
export const ROUTES: any = [
  {
    path: '/client/dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
    class: '',
  },
  { path: '/client/profile', title: 'Mon Profile', icon: 'person', class: '' },
  { path: '/client/dossier', title: 'Mes dossier', icon: 'person', class: '' },
  {
    path: '/client/nouveau-credit',
    title: 'Nouveau crédit',
    icon: 'person',
    class: '',
  },
];
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
