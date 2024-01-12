import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
import { SimulationServiceService } from '../../service/simulation-service.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  habitation: string = '';
  financement: string = '';
  durer: string = '';
  age: string = '';
  interet: string = '0.065';
  apportInitial: number = 0;
  mensualite: string = '';
  revenue: string = '';
  otherFinancing: string = '';
  montantDuBien: number = 0;
  consomation: boolean = false;
  eligible: boolean = false;
  islamique: boolean = false;
  bonifie: boolean = false;
  financementType: string = '';
  financementTypeChoice: string = '';
  islamiqueotherCarAndVehicule: boolean = false;
  islamiqueMargeCredit: string = '';
  currentUser: any;
  isLoged: boolean = false;
  data: any;
  s: any;
  constructor(
    private router: Router,
    private simulationService: SimulationServiceService
  ) {}
  ngOnInit(): void {
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }

    if (this.currentUser?.role === 'particulier') {
      this.isLoged = true;
    }
    const type = localStorage.getItem('financementType');
    const immobilierType = localStorage.getItem('immobilierType');
    const consomationType = localStorage.getItem('consomationType');
    const islamiqueType = localStorage.getItem('islamiqueType');

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
      this.financementType = type;
      this.financementTypeChoice = immobilierType ? immobilierType : '';
      if (formImmobilierDataJson) {
        // Convertissez la chaîne JSON en objet JavaScript
        const formData = JSON.parse(formImmobilierDataJson);
        this.otherFinancing = formData.otherFinancing;
        this.financement = formData.credit;
        this.durer = formData.durer;
        this.revenue = formData.revenueCumule;
        this.habitation = formData.habitation;
        this.age = formData.age;
        this.apportInitial =
          parseFloat(formData.habitation) - parseFloat(formData.credit);
        // Appelez la méthode pour calculer la mensualité
        this.calculerMensualite();

        // Vérifiez l'éligibilité
        this.verifierEligibilite();
      }
    } else if (type === 'consomation') {
      this.consomation = true;
      this.financementTypeChoice = consomationType ? consomationType : '';
      if (formConsomationData) {
        // Convertissez la chaîne JSON en objet JavaScript
        const formData = JSON.parse(formConsomationData);

        this.financement = formData.credit;
        this.durer = formData.durer;
        this.age = formData.age;
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
      this.financementTypeChoice = immobilierType ? immobilierType : '';
      this.islamique = true;
      if (
        islamiqueType === 'ijaraTamilikiya' ||
        islamiqueType === 'morabahaIstihlakiya'
      ) {
        this.islamiqueotherCarAndVehicule = true;
      }
      if (formislamiqueData) {
        // Convertissez la chaîne JSON en objet JavaScript
        const formData = JSON.parse(formislamiqueData);
        this.islamiqueMargeCredit = formData.margeCredit;
        this.financement = formData.credit;
        this.durer = formData.durer;
        this.age = formData.age;
        this.revenue = formData.revenueCumule;
        this.habitation = formData.consommation;
        this.apportInitial =
          parseFloat(formData.montantDuBien) - parseFloat(formData.credit);
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
    const financement = this.islamiqueotherCarAndVehicule
      ? parseFloat(this.islamiqueMargeCredit)
      : parseFloat(this.financement);
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

  createFolder() {
    if (this.isLoged) {
      const type = localStorage.getItem('financementType');
      if (type === 'immobilier') {
        this.s = localStorage.getItem('formImmobilierData');
      } else if (type === 'consomation') {
        this.s = localStorage.getItem('formConsomationData');
      } else if (type === 'islamique') {
        this.s = localStorage.getItem('formislamiqueData');
      }
      if (this.s) {
        const simulationData = JSON.parse(this.s);
        this.data = simulationData;
      }
      const dossier = {
        client: {
          id: this.currentUser.id,
        },
        typeCredit: { id: 5 },
        montantHabitation: this.data.habitation,
        creditSouhaite: this.data.credit,
        revenueEmprunteur: this.data.revenue,
        revenueCoEmprunteur: this.data.revenueCo,
        montantAutreFinancementEnCours: this.data.autherFinancing,
        montantRevenueImmobilier: this.data.revenuImobilier,
        ageEmprunteur: this.data.age,
        ageCoEmprunteur: this.data.ageCo,
        dureeFinancement: this.data.durer,
        montantAutreRevenue: 0,
      };

      const d = JSON.stringify(dossier);

      this.simulationService.addDossier(d).subscribe(
        (rs) => {
          console.log('dossier cree', rs);

          this.router.navigate(['/client/dossier']);
        },
        (error) => {
          console.error('Erreur de connexion:', error);
        }
      );
    } else {
      this.router.navigate(['/simulation/register']);
    }
  }
}
