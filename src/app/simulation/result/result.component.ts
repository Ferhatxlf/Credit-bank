import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  habitation: string = '';
  financement: string = '';
  durer: string = '';
  interet: string = '0.065';
  apportInitial: number = 0;
  mensualite: string = '';
  revenue: string = '';
  prixVehicule: number = 0;
  consomation: boolean = false;
  eligible: boolean = false;
  islamique: boolean = false;
  bonifie: boolean = false;

  ngOnInit(): void {
    const type = localStorage.getItem('financementType');
    const immobilierType = localStorage.getItem('immobilierType');
    const formImmobilierDataJson = localStorage.getItem('formImmobilierData');
    const formConsomationData = localStorage.getItem('formConsomationData');
    const formislamiqueData = localStorage.getItem('formislamiqueData');

    // immobilier bonifie
    if (
      immobilierType ===
        "Achat d'un logement promotionnel achevé ou vendu sur plans (Bonifié)" ||
      immobilierType === "Construction d'un logement rural (Bonifié)" ||
      immobilierType === "Achat d'un logement LPP (Bonifié)"
    ) {
      this.bonifie = true;
    } else {
      this.bonifie = false;
    }

    if (type === 'immobilier') {
      if (formImmobilierDataJson) {
        // Convertissez la chaîne JSON en objet JavaScript
        const formData = JSON.parse(formImmobilierDataJson);

        this.financement = formData.credit;
        this.durer = formData.durer;
        this.revenue = formData.revenueCumule;
        this.habitation = formData.habitation;
        this.apportInitial =
          parseFloat(formData.habitation) - parseFloat(formData.credit);
        // Appelez la méthode pour calculer la mensualité
        this.calculerMensualite();

        // Vérifiez l'éligibilité
        this.verifierEligibilite();
      }
    } else if (type === 'consomation') {
      this.consomation = true;
      if (formConsomationData) {
        // Convertissez la chaîne JSON en objet JavaScript
        const formData = JSON.parse(formConsomationData);

        this.financement = formData.credit;
        this.durer = formData.durer;
        this.revenue = formData.revenueCumule;
        this.habitation = formData.consommation;
        this.apportInitial =
          parseFloat(formData.consommation) - parseFloat(formData.credit);
        // Appelez la méthode pour calculer la mensualité
        this.calculerMensualiteConsomation();

        // Vérifiez l'éligibilité
        this.verifierEligibiliteConsomation();
      }
    } else if (type === 'islamique') {
      this.islamique = true;
      if (formislamiqueData) {
        // Convertissez la chaîne JSON en objet JavaScript
        const formData = JSON.parse(formislamiqueData);

        this.financement = formData.credit;
        this.durer = formData.durer;
        this.revenue = formData.revenueCumule;
        this.habitation = formData.consommation;
        this.apportInitial =
          parseFloat(formData.prixVehicule) - parseFloat(formData.credit);
        // Appelez la méthode pour calculer la mensualité
        this.calculerMensualiteIslamique();

        // Vérifiez l'éligibilité
        this.verifierEligibiliteIslamique();
      }
    }
  }

  // fonction qui génère le PDF
  generatePDF() {
    const element = document.querySelector('.pdf');
    html2pdf(element);
  }

  calculerMensualite() {
    // Convertissez les chaînes en nombres
    const financement = parseFloat(this.financement);
    const durer = parseFloat(this.durer);
    // const interet = 0.065 / 12;
    const interet = this.bonifie ? 0.01 / 12 : 0.065 / 12;
    this.interet = this.bonifie ? '1 %' : '6.5 %';
    console.log('test interet', interet);
    // Vérifiez si les valeurs sont valides
    if (!isNaN(financement) && !isNaN(durer) && !isNaN(interet)) {
      // Calcul de n (nombre de paiements)
      const n = durer * 12;

      // Calcul de la mensualité selon la formule
      const mensualite =
        (financement * interet * Math.pow(1 + interet, n)) /
        (Math.pow(1 + interet, n) - 1);
      console.log(mensualite);

      // Affectez le résultat à la propriété mensualite
      this.mensualite = mensualite.toString();
    } else {
      // Gérez le cas où les valeurs ne sont pas valides
      console.error(
        "Les valeurs de financement, durée ou taux d'intérêt ne sont pas valides."
      );
    }
  }
  calculerMensualiteConsomation() {
    // Convertissez les chaînes en nombres
    const financement = parseFloat(this.financement);
    const durer = parseFloat(this.durer);
    const interet = 0.085 / 12;

    // Vérifiez si les valeurs sont valides
    if (!isNaN(financement) && !isNaN(durer) && !isNaN(interet)) {
      // Calcul de n (nombre de paiements)
      const n = durer * 12;

      // Calcul de la mensualité selon la formule
      const mensualite =
        (financement * interet * Math.pow(1 + interet, n)) /
        (Math.pow(1 + interet, n) - 1);
      console.log(mensualite);

      // Affectez le résultat à la propriété mensualite
      this.mensualite = mensualite.toString();
    } else {
      // Gérez le cas où les valeurs ne sont pas valides
      console.error(
        "Les valeurs de financement, durée ou taux d'intérêt ne sont pas valides."
      );
    }
  }
  calculerMensualiteIslamique() {
    // Convertissez les chaînes en nombres
    const financement = parseFloat(this.financement);
    const durer = parseFloat(this.durer);
    const interet = 0.085 / 12;

    // Vérifiez si les valeurs sont valides
    if (!isNaN(financement) && !isNaN(durer) && !isNaN(interet)) {
      // Calcul de n (nombre de paiements)
      const n = durer * 12;

      // Calcul de la mensualité selon la formule
      const mensualite = financement / n;

      // Affectez le résultat à la propriété mensualite
      this.mensualite = mensualite.toString();
    } else {
      // Gérez le cas où les valeurs ne sont pas valides
      console.error(
        "Les valeurs de financement, durée ou taux d'intérêt ne sont pas valides."
      );
    }
  }

  verifierEligibilite() {
    // Convertissez les chaînes en nombres
    const revenue = parseFloat(this.revenue);
    const mensualite = parseFloat(this.mensualite);

    if (!isNaN(revenue) && !isNaN(mensualite)) {
      // Vérifiez l'éligibilité
      if (revenue <= 80000) {
        this.eligible = mensualite <= revenue * 0.4;
      } else {
        this.eligible = mensualite <= revenue * 0.5;
      }
      console.log('je suis ici', this.eligible);
      // Si le client n'est pas éligible, ajustez le montant du financement
      if (!this.eligible) {
        this.ajusterMontantFinancement(revenue);
      }
    }
  }
  verifierEligibiliteIslamique() {
    // Convertissez les chaînes en nombres
    const revenue = parseFloat(this.revenue);
    const mensualite = parseFloat(this.mensualite);

    if (!isNaN(revenue) && !isNaN(mensualite)) {
      // Vérifiez l'éligibilité
      if (revenue <= 80000) {
        this.eligible = mensualite <= revenue * 0.4;
      } else {
        this.eligible = mensualite <= revenue * 0.5;
      }
      console.log('je suis ici', this.eligible);
      // Si le client n'est pas éligible, ajustez le montant du financement
      // if (!this.eligible) {
      //   this.ajusterMontantFinancementConsomation(revenue);
      // }
    }
  }
  verifierEligibiliteConsomation() {
    // Convertissez les chaînes en nombres
    const revenue = parseFloat(this.revenue);
    const mensualite = parseFloat(this.mensualite);

    if (!isNaN(revenue) && !isNaN(mensualite)) {
      // Vérifiez l'éligibilité
      if (revenue <= 80000) {
        this.eligible = mensualite <= revenue * 0.4;
      } else {
        this.eligible = mensualite <= revenue * 0.5;
      }
      console.log('je suis ici', this.eligible);
      // Si le client n'est pas éligible, ajustez le montant du financement
      if (!this.eligible) {
        this.ajusterMontantFinancementConsomation(revenue);
      }
    }
  }
  // pour immobilier
  ajusterMontantFinancement(revenue: number) {
    const interet = 0.065 / 12; // Taux d'intérêt mensuel
    const durer = parseFloat(this.durer);
    const n = durer * 12; // Nombre de paiements

    // Calculer la mensualité maximale admissible
    let mensualiteMax;
    if (revenue <= 80000) {
      mensualiteMax = revenue * 0.4;
    } else {
      mensualiteMax = revenue * 0.5;
    }

    // Inverser la formule de la mensualité pour calculer le montant du financement
    const nouveauMontant =
      (mensualiteMax * (Math.pow(1 + interet, n) - 1)) /
      (interet * Math.pow(1 + interet, n));

    // Mettez à jour la valeur du financement
    this.financement = nouveauMontant.toString();
    this.apportInitial =
      parseFloat(this.habitation) - parseFloat(this.financement);
    // Recalculer la mensualité avec le nouveau montant
    this.calculerMensualite();
  }
  // pour la consomation
  ajusterMontantFinancementConsomation(revenue: number) {
    const interet = 0.085 / 12; // Taux d'intérêt mensuel
    const durer = parseFloat(this.durer);
    const n = durer * 12; // Nombre de paiements

    // Calculer la mensualité maximale admissible
    let mensualiteMax;
    if (revenue <= 80000) {
      mensualiteMax = revenue * 0.4;
    } else {
      mensualiteMax = revenue * 0.5;
    }

    // Inverser la formule de la mensualité pour calculer le montant du financement
    const nouveauMontant =
      (mensualiteMax * (Math.pow(1 + interet, n) - 1)) /
      (interet * Math.pow(1 + interet, n));

    // Mettez à jour la valeur du financement
    this.financement = nouveauMontant.toString();
    this.apportInitial =
      parseFloat(this.habitation) - parseFloat(this.financement);
    // Recalculer la mensualité avec le nouveau montant
    this.calculerMensualiteConsomation();
  }

  estDansPlageAcceptable(revenue: number): boolean {
    // Vérifiez l'éligibilité
    if (revenue <= 80000) {
      return parseFloat(this.mensualite) <= revenue * 0.4;
    } else {
      return parseFloat(this.mensualite) <= revenue * 0.5;
    }
  }
}
