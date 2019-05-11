import {Component, Input, forwardRef, OnInit, OnDestroy} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {filter, map, debounceTime, distinctUntilChanged, startWith} from 'rxjs/operators';
import {combineLatest, Observable, merge, Subscription} from 'rxjs';
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parse, format,
  isDate, isValid, isFuture
} from 'date-fns';
import {isValidDate} from '../../utils/date.util';

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
export class AgeInputComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @Input()
  daysTop = 90;
  @Input()
  daysBottom = 0;
  @Input()
  monthsTop = 24;
  @Input()
  monthsBottom = 1;
  @Input()
  yearsBottom = 1;
  @Input()
  yearsTop = 150;
  @Input()
  debounceTime = 300;
  @Input() dateFormat = 'YYYY-MM-DD';

  selectedUnit = AgeUnit.Year;
  form: FormGroup;
  ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];
  subBirth: Subscription;
  private propagateChange = (_: any) => {
  };

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      birthday: ['', this.validateDate],
      age: this.formBuilder.group({
        ageNumber: [''],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNumber', 'ageUnit')})
    });

    const birthday = this.form.get('birthday');
    const ageNumber = this.form.get('age').get('ageNumber');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges.pipe(
      map(d => ({
          date: d,
          from: 'birthday'
        })
      ),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      filter(date => birthday.valid)
    );
    const ageNumber$ = ageNumber.valueChanges.pipe(
      startWith(ageNumber.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const ageUnit$ = ageUnit.valueChanges.pipe(
      startWith(ageUnit.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const age$ = combineLatest(ageNumber$, ageUnit$, (n: number, u: AgeUnit) => {
      return this.toDate({age: n, unit: u});
    }).pipe(
      map(d => ({date: d, from: 'age'})),
      filter(age => this.form.get('age').valid)
    );

    const merge$ = merge(birthday$, age$).pipe(
      filter(_ => this.form.valid)
    );

    this.subBirth = merge$.subscribe(
      (date: { date: string, from: string }) => {
        const newAge = this.toAge(date.date);
        if (date.from === 'birthday') {
          if (newAge.age !== ageNumber.value) {
            ageNumber.patchValue(newAge.age, {emitEvent: false});
          }
          if (newAge.unit !== ageUnit.value) {
            this.selectedUnit = newAge.unit;
            ageNumber.patchValue(newAge.unit, {emitEvent: false});
          }
          this.propagateChange(date.date);
        } else {
          console.log('change birthday.');
          const ageFromBirthday = this.toAge(birthday.value);
          if (newAge.age !== ageFromBirthday.age || newAge.unit !== ageFromBirthday.unit) {
            birthday.patchValue(date.date, {emitEvent: false});
            this.propagateChange(date.date);
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subBirth) {
      this.subBirth.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      const date = format(obj, this.dateFormat);
      this.form.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.form.get('age').get('ageNumber').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  validate(formControl: FormControl): { [key: string]: any } {
    const value = formControl.value;

    if (!value) {
      return null;
    }

    if (isValidDate(value)) {
      return null;
    }
    return isValidDate(value) ? null : {
      dateOfBirthdayInvalid: true
    };
  }

  validateDate(formControl: FormControl): { [key: string]: any } {
    const value = formControl.value;

    return isValidDate(value) ? null : {
      BirthdayInvalid: true
    };
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (formGroup: FormGroup): { [key: string]: any } => {
      const ageNum = formGroup.controls[ageNumKey];
      const ageUnit = formGroup.controls[ageUnitKey];

      let result = false;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNum.value >= this.yearsBottom && ageNum.value <= this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNum.value >= this.monthsBottom && ageNum.value <= this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNum.value >= this.daysBottom && ageNum.value <= this.daysTop;
          break;
        }
        default:
          break;
      }
      return result ? null : {
        ageInvalid: true
      };
    };
  }

  toAge(dateString: string): Age {
    const date = parse(dateString);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date) ?
      {age: differenceInDays(now, date), unit: AgeUnit.Day} :
      isBefore(subMonths(now, this.monthsTop), date) ?
        {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
        {age: differenceInYears(now, date), unit: AgeUnit.Year};
  }

  toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year:
        return format(subYears(now, age.age), this.dateFormat);
      case AgeUnit.Month:
        return format(subMonths(now, age.age), this.dateFormat);
      case AgeUnit.Day:
        return format(subDays(now, age.age), this.dateFormat);
      default:
        return null;
    }
  }
}
