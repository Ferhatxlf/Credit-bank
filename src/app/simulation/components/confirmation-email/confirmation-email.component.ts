// Dans votre fichier de composant TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmation-email',
  templateUrl: './confirmation-email.component.html',
  styleUrls: ['./confirmation-email.component.css'],
})
export class ConfirmationEmailComponent {
  inputs = Array(6).fill(0);
  inputValues = Array(6).fill(null);
  currentInput = 0;

  onKeyup(i: number) {
    if (i === this.currentInput) {
      this.currentInput++;
    }
  }

  submit() {
    let code = this.inputValues.join('');
    console.log(code);
  }
}
