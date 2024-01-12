import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientGardService {
  currentUser: any;
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      this.currentUser = JSON.parse(currentUserData);
    }
    if (this.currentUser && this.currentUser.role === 'particulier') {
      return true; // Accès autorisé pour les banquiers
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
