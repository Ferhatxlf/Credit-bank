import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFormatInput]',
})
export class FormatInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;

    // Supprimez les espaces existants et les virgules
    const numericValue = initialValue.replace(/\s+/g, '').replace(/,/g, '');

    // Supprimez les caractères non numériques
    const onlyNumericValue = numericValue.replace(/\D/g, '');

    // Stockez cette valeur pour les calculs
    this.el.nativeElement.dataset.numericValue = onlyNumericValue;

    // Formate en ajoutant des espaces chaque trois chiffres pour l'affichage
    const formattedValue = onlyNumericValue.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ' '
    );

    if (initialValue !== formattedValue) {
      event.stopPropagation();
    }

    this.el.nativeElement.value = formattedValue;
  }
}
