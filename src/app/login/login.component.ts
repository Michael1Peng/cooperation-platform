import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {QuoteService} from '../service/quote.service';
import {Quote} from '../domain';
import {Observable, Subscription} from 'rxjs';
import * as actions from '../actions/quote.action';
import * as fromRoot from '../reducers';
import {Store, select} from '@ngrx/store';

/**
 * @description Login page, we will show some images and sentences as decoration.
 */

@Component({
  selector: 'app-login',
  template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit(form, $event)">
          <mat-card>
              <mat-card-header>
                  <mat-card-title>Login:</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                  <mat-form-field color="accent" class="full-width">
                      <input matInput type="text" placeholder="Your email" formControlName="email">
                  </mat-form-field>
                  <mat-form-field color="accent" class="full-width">
                      <input matInput type="password" placeholder="Your password" formControlName="password">
                  </mat-form-field>
                  <button mat-raised-button type="submit" [disabled]="!form.valid">Login</button>
              </mat-card-content>
              <mat-card-actions class="text-right">
                  <p>Not registerd?<a routerLink="/register">Register</a></p>
                  <p>Forget password?<a href="">Find</a></p>
              </mat-card-actions>
          </mat-card>
          <mat-card>
              <mat-card-title>One sentence</mat-card-title>
              <mat-card-subtitle>
                  --April 14
              </mat-card-subtitle>
              <img mat-card-image [src]="(quote$|async).pic">
              <mat-card-content>
                  {{(quote$ | async).cn}}
              </mat-card-content>
          </mat-card>
      </form>
  `,
  styles: [`
      mat-card {
          width: 20em;
          flex: 0 0 20em;
      }

      form {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
      }

      .text-right {
          margin: 5px;
          text-align: end;
      }
  `]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(
    private formBuilder: FormBuilder,
    private quoteService$: QuoteService,
    private store$: Store<fromRoot.State>) {
    this.quote$ = this.store$.pipe(select(fromRoot.getQuoteState));

    // subscribe and dispatch the latest quote
    quoteService$.getQuotes().subscribe(q => {
      debugger;
      this.store$.dispatch(new actions.QuoteSuccessAction(q[0]));
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, this.emailValidate])],
      password: ['', Validators.required]
    });
    this.store$.dispatch(new actions.QuoteAction());
  }

  onSubmit({value, valid}, event: Event) {
    console.log(JSON.stringify(value));
    console.log(valid);
  }

  emailValidate(formControl: FormControl): { [key: string]: any } {
    if (!formControl.value) {
      return null;
    }

    const reg = /\w+@\w+.\w+/;

    if (reg.test(formControl.value)) {
      return null;
    } else {
      return {
        emailNotValid: 'Please input a email'
      };
    }
  }

}
