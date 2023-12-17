import { Component } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {
  generatePDF() {
    const element = document.querySelector('.pdf');
    html2pdf(element);
  }
}
