import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class CourtierGardService {
  currentUser: any;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      this.currentUser = JSON.parse(currentUserData);
    }
    if (this.currentUser && this.currentUser.role === 'courtier') {
      return true; // Accès autorisé pour les banquiers
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
