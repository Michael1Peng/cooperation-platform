import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';
import {extractIdNoInfo, isValidAddr, getAddrByCode, getBirthdayByCode} from '../utils/identity.util';
import {isValidDate} from '../utils/date.util';

/**
 * @description the registration page
 */

@Component({
  selector: 'app-register',
  /**
   * @description First tab is information about account, like account, password...
   *              second tab is information about person himself, like id number, how old he is, where he lives...
   */
  template: `
      <form [formGroup]="form">
          <mat-card>
              <mat-tab-group>
                  <mat-tab label="Account Information">
                      <mat-card-header>
                          <mat-card-title>Register:</mat-card-title>
                      </mat-card-header>
                      <mat-card-content>
                          <mat-form-field color="accent" class="full-width">
                              <input matInput type="text" placeholder="Your email" formControlName="email">
                          </mat-form-field>
                          <mat-form-field color="accent" class="full-width">
                              <input matInput type="text" placeholder="Your name" formControlName="name">
                          </mat-form-field>
                          <mat-form-field color="accent" class="full-width">
                              <input matInput type="password" placeholder="Your password" formControlName="password">
                          </mat-form-field>
                          <mat-form-field color="accent" class="full-width">
                              <input matInput type="password" placeholder="Repeat Your password"
                                     formControlName="repeat">
                          </mat-form-field>
                          <app-image-select-list
                                  [useSvgIcon]="true"
                                  [cols]="6"
                                  [title]="'Choose your avatar: '"
                                  [items]="items"
                                  formControlName="avatar"
                          >
                          </app-image-select-list>
                          <button mat-raised-button type="button">Register</button>
                      </mat-card-content>
                      <mat-card-actions class="text-right">
                          <p>Not registerd?<a href="">Login</a></p>
                          <p>Forget password?<a href="">Back</a></p>
                      </mat-card-actions>
                  </mat-tab>
                  <mat-tab label="Personal Information">
                      <div class="full-width">
                          <app-identity-input formControlName="identityInput"></app-identity-input>
                      </div>
                      <div class="full-width">
                          <app-age-input formControlName="ageInput"></app-age-input>
                      </div>
                      <div class="full-width">
                          <app-area-input formControlName="areaInput"></app-area-input>
                      </div>
                  </mat-tab>
              </mat-tab-group>
          </mat-card>
      </form>
  `,
  styles: [`
      mat-icon.avatar {
          overflow: hidden;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          margin: 12px;
      }

      mat-card {
          width: 600px;
      }

      form {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
      }

  `]
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  items: string[];
  sub: Subscription;

  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    const nums = [];
    for (let i = 1; i <= 16; i++) {
      nums.push(i);
    }
    this.items = nums.map(num => `avatars:svg-${num}`);
    const img = `avatars:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    // Initialize the form
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeat: ['', Validators.required],
      ageInput: ['1990-01-01'],
      areaInput: [],
      identityInput: [],
      avatar: [img]
    });

    /**
     * connect the identityInput to areaInput and ageInput, when we change the identity and it's valid,
     * it will change the areaInput and ageInput correspondingly.
     */
    const id$ = this.form.get('identityInput').valueChanges.pipe(
      // debounceTime(3000),
      // filter(_ => this.form.get('identityInput').valid)
    );
    this.sub = id$.subscribe(id => {
      const info = extractIdNoInfo(id.identityNo);              // extract information about address, birthday and gender from id number.
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.patchValue({areaInput: addr});
        this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
      if (isValidDate(info.birthdayCode)) {
        debugger;
        const birthday = getBirthdayByCode(info.birthdayCode);
        this.form.patchValue({ageInput: birthday});
        this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
