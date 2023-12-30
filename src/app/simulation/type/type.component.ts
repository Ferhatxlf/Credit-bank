import { Component } from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrl: './type.component.css',
})
export class TypeComponent {
  islamique: boolean = false;
  setIslamiqueCheck() {
    this.islamique = !this.islamique;
    console.log("l'element est ", this.islamique);
  }
  onClickType(typeName): void {
    // Enregistrez la variable dans localStorage
    localStorage.setItem('financementType', typeName);
  }
}
