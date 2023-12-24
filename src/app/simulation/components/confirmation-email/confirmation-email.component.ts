import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-confirmation-email',
  templateUrl: './confirmation-email.component.html',
  styleUrls: ['./confirmation-email.component.css'],
})
export class ConfirmationEmailComponent {
  inputs = Array(6).fill(0);
  inputValues = Array(6).fill(null);
  currentInput = 0;

  @ViewChildren('input') inputElements!: QueryList<ElementRef>;

  onKeyup(i: number) {
    if (i === this.currentInput) {
      this.currentInput++;
      this.focusInput(this.currentInput);
    }
  }

  focusInput(index: number): void {
    setTimeout(() => {
      this.inputElements.toArray()[index].nativeElement.focus();
    }, 0);
  }

  submit() {
    let code = this.inputValues.join('');
    console.log(code);
  }
}
