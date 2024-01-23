import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrl: './type.component.css',
})
export class TypeComponent implements OnInit {
  islamique: boolean = false;

  ngOnInit(): void {
    // suppression des données du formulaires
    sessionStorage.removeItem('formImmobilierData');
    sessionStorage.removeItem('formConsomationData');
    sessionStorage.removeItem('formislamiqueData');
  }

  setIslamiqueCheck() {
    this.islamique = !this.islamique;
    console.log("l'element est ", this.islamique);
  }
  onClickType(typeName): void {
    // Enregistrez la variable dans localStorage
    localStorage.setItem('financementType', typeName);
  }

  onClickTypeCredit(typeName): void {
    // Enregistrez la variable dans localStorage
    localStorage.setItem('creditType', typeName);
  }
}
