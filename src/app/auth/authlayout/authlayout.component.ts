import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-authlayout',
  templateUrl: './authlayout.component.html',
  styleUrl: './authlayout.component.css',
})
export class AuthlayoutComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  public showModale: boolean = false;
  public toggleModale(): any {
    this.showModale = !this.showModale;
  }
}
