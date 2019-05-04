import {Component, Input, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {filter, map, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {combineLatest, Observable, merge} from 'rxjs';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements OnInit, ControlValueAccessor {

  form: FormGroup;
  private propagateChange = (_: any) => {};

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      birthday: [],
      age: this.formBuilder.group({
        ageNumber: [],
        ageUnit: []
      })
    });

    const birthday = this.form.get('birthday');
    const ageNumber = this.form.get('age').get('ageNumber');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges.pipe(
      map( d => ({
        date: d,
        from: 'birthday'
        })
      ),
      debounceTime(300),
      distinctUntilChanged(),
      filter( date => birthday.valid)
    );
    const ageNumber$ = ageNumber.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
    const ageUnit$ = ageUnit.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
    const age$ = combineLatest(ageNumber$, ageUnit$, (n, u) => {
      // TODO: toDate
    }).pipe(
      map(d => ({date: d, from: 'age'})),
      filter(age => this.form.get('age').value)
    );

    const merge$ = merge(birthday$, age$).pipe(
      filter(_ => this.form.valid)
    );
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

}
