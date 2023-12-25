import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}
  toggleHomeLogin: boolean = true;
  setToggleHomeLogin() {
    this.toggleHomeLogin = !this.toggleHomeLogin;
  }
  goToConnexion() {
    this.router.navigate(['/auth']);
  }
}
