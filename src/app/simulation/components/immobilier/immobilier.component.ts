import { Component } from '@angular/core';
interface CreditType {
  id: number;
  name: string;
}

@Component({
  selector: 'app-immobilier',
  templateUrl: './immobilier.component.html',
  styleUrl: './immobilier.component.css',
})
export class ImmobilierComponent {
  creditType: CreditType[] = [
    {
      id: 0,
      name: "Achat d'un logement auprès d'un particulier",
    },
    {
      id: 1,
      name: "Acquisition dun logement auprès d'un promoteur",
    },
    {
      id: 2,
      name: "Construction d'une habitation individuelle",
    },
    {
      id: 3,
      name: 'Coopérative immobilière',
    },
    {
      id: 4,
      name: 'Aménagement',
    },
    {
      id: 5,
      name: "Extension d'une habitation individuelle",
    },
    {
      id: 6,
      name: "Surélévation d'une habitation individuelle",
    },
    {
      id: 7,
      name: 'Achat d\'un logement formule "Vente Sur Plan"',
    },
    {
      id: 9,
      name: "Achat d'un terrain",
    },
    {
      id: 10,
      name: "Acquisition d'un local commercial",
    },
    {
      id: 11,
      name: 'Acquisition d\'un local commercial en "VSP"',
    },
    {
      id: 12,
      name: "Construction d'un local commercial",
    },
    {
      id: 13,
      name: "Extension d'un local commercial",
    },
    {
      id: 14,
      name: "Aménagement d'un local commercial",
    },
    {
      id: 15,
      name: "Acquisition d'un logement promotionnel collectif fini (Prêt bonifié)",
    },
    {
      id: 16,
      name: 'Acquisition d\'un logement promotionnel collectif en "VSP" (Prêt bonifié)',
    },
  ];
}
