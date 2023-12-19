import { Component } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent {
  public co_emprunteur: boolean = false;
  public otherFinancement: boolean = false;
  public patrimoine: boolean = false;

  hasCoEmprunter() {
    this.co_emprunteur = true;
  }
  dontHasCoEmprunter() {
    this.co_emprunteur = false;
  }

  haspatrimoine() {
    this.patrimoine = true;
  }
  dontHaspatrimoine() {
    this.patrimoine = false;
  }
  hasOtherF() {
    this.otherFinancement = true;
  }

  dontHasOtherF() {
    this.otherFinancement = false;
  }
}
