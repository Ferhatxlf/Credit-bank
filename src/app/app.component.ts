import { Component } from '@angular/core';
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
  {
    path: '/admin/courtier',
    title: 'Gestion des courtiers',
    icon: 'person',
    class: '',
  },
  {
    path: '/admin/directeur',
    title: 'Gestion des directeurs',
    icon: 'person',
    class: '',
  },
  {
    path: '/courtier/dossier',
    title: 'Liste des dossiers',
    icon: 'person',
    class: '',
  },
  { path: '/admin/profile', title: 'Mon Profile', icon: 'person', class: '' },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Credit-bank';
}
