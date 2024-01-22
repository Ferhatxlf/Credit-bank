import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-islamique',
  templateUrl: './islamique.component.html',
  styleUrl: './islamique.component.css',
})
export class IslamiqueComponent implements OnInit {
  ngOnInit(): void {
    sessionStorage.removeItem('formislamiqueData');
  }

  onClickType(typeName): void {
    // Enregistrez la variable dans localStorage
    localStorage.setItem('islamiqueType', typeName);
  }
}
