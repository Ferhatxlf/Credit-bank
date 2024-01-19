import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval, Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { AuthServiceService } from '../../../service/auth-service.service';
import { ClientServiceService } from '../../../service/client-service.service';

@Component({
  selector: 'app-confirmation-email',
  templateUrl: './confirmation-email.component.html',
  styleUrls: ['./confirmation-email.component.css'],
})
export class ConfirmationEmailComponent implements OnInit, OnDestroy {
  inputs = Array(6).fill(0);
  inputValues = Array(6).fill(null);
  currentInput = 0;
  id_regestring_user: any;
  isStartInterval: boolean;
  countDown: Observable<string>;
  messageError: string = '';
  data: any;
  email: any;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private clientService: ClientServiceService
  ) {
    this.isStartInterval = true;
    this.countDown = timer(0, 1000).pipe(
      map((i) => 300 - i),
      takeWhile((i) => i >= 0),
      map((i) => `${Math.floor(i / 60)}:${i % 60 < 10 ? '0' : ''}${i % 60}`)
    );
  }

  @ViewChildren('input') inputElements!: QueryList<ElementRef>;
  startTime!: number;

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

  private subscription!: Subscription;

  ngOnInit() {
    this.isStartInterval = true;
    this.startInterval();
    this.startTime = Date.now();
    this.recupEamil();
  }
  recupEamil() {
    const dataRegister = localStorage.getItem('formRegisterData');
    if (dataRegister) {
      this.data = JSON.parse(dataRegister);
    }
  }

  ngOnDestroy() {
    // Nettoyez l'abonnement lorsque le composant est détruit
    this.stopInterval();
  }

  private startInterval() {
    this.subscription = interval(10000).subscribe(() => {
      const a = localStorage.getItem('id_for_confirmation_email');
      if (a) {
        this.id_regestring_user = JSON.parse(a);
      }
      this.authService.getClient(this.id_regestring_user).subscribe(
        (rs) => {
          if (rs['activated']) {
            this.router.navigate(['/simulation/upload']);

            const user = {
              token: rs['token'],
              id: rs['id'],

              role: 'particulier',
            };
            console.log(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.stopIntervalWithNavigation();
          }
        },
        (err) => {
          console.log('erreur', err);
        }
      );

      if (this.isFiveMinutesElapsed()) {
        this.stopInterval();
      }
    });
  }

  private stopIntervalWithNavigation() {
    this.isStartInterval = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  private stopInterval() {
    this.messageError =
      "La durée de l'email d'activation a expiré. Veuillez cliquer sur \"Renvoyer l'email d'activation\" pour recevoir un nouveau email.";
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  private isFiveMinutesElapsed(): boolean {
    const currentTime = Date.now(); // Obtenez le moment actuel
    const elapsedMinutes = (currentTime - this.startTime) / (1000 * 60); // Calculez le temps écoulé en minutes

    // Vérifiez si 5 minutes se sont écoulées
    return elapsedMinutes >= 5;
  }

  // sendAnOtherEmail() {
  //   this.messageError = '';
  //   console.log(this.data);
  //   const email = { email: this.data };
  //   const data = JSON.stringify(email);
  //   this.clientService.sendAnOtherEmail(data).subscribe(
  //     (rs) => {
  //       console.log(rs);
  //     },
  //     (err) => console.log(err)
  //   );
  // }
  sendAnOtherEmail() {
    this.messageError = '';
    console.log('data=' + this.data); // Change 'this.mydata' to 'this.data'

    const mydata = JSON.stringify(this.data);

    console.log('mydata:::::' + mydata);

    const email = this.data.email; // Change 'this.mydata' to 'this.data'

    console.log('Email:', email);

    this.clientService.sendAnOtherEmail(email).subscribe(
      (rs) => {
        console.log(rs);
      },
      (err) => console.log(err)
    );
  }
}
