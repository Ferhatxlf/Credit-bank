import { Component } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { DirectorServiceService } from '../../service/director-service.service';
import { SimulationServiceService } from '../../service/simulation-service.service';

@Component({
  selector: 'app-mon-dossier',
  templateUrl: './mon-dossier.component.html',
  styleUrl: './mon-dossier.component.css',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '350px',
          width: '200px',
          backgroundColor: 'white',
          borderRadius: '10px',
          justifyContent: 'start',
          alignItem: 'start',
          color: 'black',
        })
      ),
      state(
        'closed',
        style({
          height: '55px',
          width: '55px',
          backgroundColor: 'green',
        })
      ),
      transition('open <=> closed', [animate('0.6s ease-out')]),
    ]),
  ],
})
export class MonDossierComponent {
  info: boolean = true;
  client: boolean = false;
  docs: boolean = false;
  credit: boolean = false;
  id: any;

  folderValue: any;
  haveCourtier: boolean = false;
  showModal: boolean = false;
  comment: any;
  folder: any;
  action: string = 'Accepter';
  isTraite: boolean = false;
  constructor(
    private location: Location,
    private sharedDataService: SharedDataService,
    private router: Router,
    private route: ActivatedRoute,
    private directeurService: DirectorServiceService,
    private simulationService: SimulationServiceService
  ) {
    this.url = this.location.path();
  }

  url: string = '';

  goBack(): void {
    this.location.back();
  }
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  // poour la modale
  toggleShowModale() {
    this.showModal = !this.showModal;
  }

  ngOnInit() {
    this.folderValue = this.sharedDataService.getFolderData();
    if (this.folderValue.courtier === '') {
      this.haveCourtier = false;
    } else {
      this.haveCourtier = true;
    }

    this.id = this.route.snapshot.paramMap.get('id');
    this.simulationService.getDossier(this.id).subscribe((rs) => {
      this.folder = rs;
    });
  }

  goInfo() {
    this.info = true;
    this.credit = false;
    this.client = false;
    this.docs = false;

    this.router.navigate([`/director/detail-dossier/${this.id}/information`]);
  }
  goCredit() {
    this.info = false;
    this.credit = true;
    this.client = false;
    this.docs = false;

    this.router.navigate([`/director/detail-dossier/${this.id}/detail-credit`]);
  }
  goClient() {
    this.info = false;
    this.credit = false;
    this.client = true;
    this.docs = false;

    this.router.navigate([`/director/detail-dossier/${this.id}/detail-client`]);
  }
  goDoc() {
    this.info = false;
    this.credit = false;
    this.client = false;
    this.docs = true;

    this.router.navigate([`/director/detail-dossier/${this.id}/document`]);
  }

  folderActions() {
    if (this.action === 'Accepter') {
      console.log('aaccept', this.comment);
      this.directeurService.acceptFolder(this.folder, this.comment).subscribe(
        (rs) => {
          console.log(rs);
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (this.action === 'Rejeter') {
      console.log('resject', this.comment);
      console.log('aaccept', this.folder);

      this.directeurService
        .rejectFolder(this.folder, this.comment)
        .toPromise()
        .then((rs) => {
          console.log(rs);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.action === 'Renvoyer') {
      console.log('renvoi', this.comment);

      this.directeurService.renvoiyeFolder(this.folder, this.comment).subscribe(
        (rs) => {
          console.log(rs);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
