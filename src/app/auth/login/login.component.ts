import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  public showModale: boolean = false;
  public toggleModale(): any {
    this.showModale = !this.showModale;
  }
}
