import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormatInputCallNumber]',
})
export class FormatInputCallNumber {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.control.value || '';

    // Supprimez les espaces existants et les virgules
    const numericValue = initialValue.replace(/\s+/g, '').replace(/,/g, '');

    // Supprimez les caractères non numériques
    let onlyNumericValue = numericValue.replace(/\D/g, '');

    // Limitez à 10 chiffres
    if (onlyNumericValue.length > 10) {
      onlyNumericValue = onlyNumericValue.slice(0, 10);
      event.preventDefault(); // Empêche l'ajout de chiffres supplémentaires
    }

    // Formate en ajoutant des espaces chaque trois chiffres pour l'affichage
    const formattedValue = onlyNumericValue.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ' '
    );

    // Mettez à jour la valeur du contrôle associé
    this.control.control?.setValue(onlyNumericValue, { emitEvent: false });

    if (initialValue !== formattedValue) {
      event.stopPropagation();
    }

    // Mettez à jour la valeur de l'élément natif
    this.el.nativeElement.value = formattedValue;
  }
}

@Directive({
  selector: '[appFormatInputNin]',
})
export class FormatInputNin {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.control.value || '';

    // Supprimez les espaces existants et les virgules
    const numericValue = initialValue.replace(/\s+/g, '').replace(/,/g, '');

    // Supprimez les caractères non numériques
    let onlyNumericValue = numericValue.replace(/\D/g, '');

    // Limitez à 16 chiffres
    if (onlyNumericValue.length > 16) {
      onlyNumericValue = onlyNumericValue.slice(0, 16);
    }

    // Stockez cette valeur pour les calculs
    this.el.nativeElement.dataset.numericValue = onlyNumericValue;

    // Formate en ajoutant des espaces chaque trois chiffres pour l'affichage
    const formattedValue = onlyNumericValue.replace(
      /\B(?=(\d{4})+(?!\d))/g,
      ' '
    );
    // Mettez à jour la valeur du contrôle associé
    this.control.control?.setValue(onlyNumericValue, { emitEvent: false });

    if (initialValue !== formattedValue) {
      event.stopPropagation();
    }

    this.el.nativeElement.value = formattedValue;
  }
}
@Directive({
  selector: '[appFormatInputPostal]',
})
export class FormatInputPostal {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.control.value || '';

    // Supprimez les espaces existants et les virgules
    const numericValue = initialValue.replace(/\s+/g, '').replace(/,/g, '');

    // Supprimez les caractères non numériques
    let onlyNumericValue = numericValue.replace(/\D/g, '');

    // Limitez à 5 chiffres
    if (onlyNumericValue.length > 5) {
      onlyNumericValue = onlyNumericValue.slice(0, 5);
    }

    // Stockez cette valeur pour les calculs
    this.el.nativeElement.dataset.numericValue = onlyNumericValue;

    // Formate en ajoutant un espace après les deux premiers chiffres
    const formattedValue = onlyNumericValue.replace(
      /^(\d{2})(\d{3})$/,
      '$1 $2'
    );
    // Mettez à jour la valeur du contrôle associé
    this.control.control?.setValue(onlyNumericValue, { emitEvent: false });

    if (initialValue !== formattedValue) {
      event.stopPropagation();
    }

    this.el.nativeElement.value = formattedValue;
  }
}
@Directive({
  selector: '[appFormatInputName]',
})
export class FormatInputName {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;

    // Supprimez les caractères non alphabétiques
    let onlyAlphaValue = initialValue.replace(/[^a-zA-Z]/g, '');

    // Limitez à 25 caractères
    if (onlyAlphaValue.length > 25) {
      onlyAlphaValue = onlyAlphaValue.slice(0, 25);
    }

    // Mettez la première lettre en majuscule et le reste en minuscule
    const formattedValue =
      onlyAlphaValue.charAt(0).toUpperCase() +
      onlyAlphaValue.slice(1).toLowerCase();

    if (initialValue !== formattedValue) {
      event.stopPropagation();
    }

    this.el.nativeElement.value = formattedValue;
  }
}
