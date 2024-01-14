import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalFunctionsService {
  constructor() {}

  status(statu): string | undefined {
    if (statu === 'TRAITEE') {
      return 'Dossier traité';
    } else if (statu === 'TRAITEMENT_ENCOURS') {
      return 'En cours de traitement';
    } else if (statu === 'NON_TRAITEE') {
      return 'Dossier non traité';
    } else if (statu === 'ACCEPTER') {
      return 'Dossier accepté';
    } else if (statu === 'REFUSER') {
      return 'Dossier rejeté';
    } else if (statu === 'RENVOYER') {
      return "plus d'information";
    } else {
      return '';
    }
  }
}
