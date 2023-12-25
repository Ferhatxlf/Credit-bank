import { Component } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent {
  patrimoine: boolean = false;
  setPatrimoine(value: boolean) {
    this.patrimoine = value;
  }

  coBorrower: boolean = false;
  setCoBorrower(value: boolean) {
    this.coBorrower = value;
  }

  otherFinancing: boolean = false;
  setOtherFinancing(value: boolean) {
    this.otherFinancing = value;
  }
  depot: boolean = false;
  setDepot(value: boolean) {
    this.depot = value;
  }
}
