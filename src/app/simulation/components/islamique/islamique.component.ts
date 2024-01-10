import { Component } from '@angular/core';

@Component({
  selector: 'app-islamique',
  templateUrl: './islamique.component.html',
  styleUrl: './islamique.component.css',
})
export class IslamiqueComponent {
  onClickType(typeName): void {
    // Enregistrez la variable dans localStorage
    localStorage.setItem('islamiqueType', typeName);
  }
}
