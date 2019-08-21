import {ChangeDetectionStrategy, Component, OnInit, forwardRef, Input, ViewChild, OnDestroy} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {combineLatest, Observable, Subject, Subscription} from 'rxjs';
import {Address} from '../domain';
import {map, startWith} from 'rxjs/operators';
import 'rxjs-compat/add/observable/of';
import {getProvinces, getCities, getDistricts} from '../utils/area.util';

/**
 * @description This component is used to select location, solving interrelated problem among provinces, cities and district.
 * @input obj from writeValue, the initial value of the location
 * */

@Component({
  selector: 'app-area-input',
  template: `
      <div class="address-group">
          <div>
              <mat-form-field>
                  <mat-select
                          placeholder="Please select province"
                          [(ngModel)]="_address.province"
                          (selectionChange)="onProvinceChange()"
                  >
                      <mat-option *ngFor="let p of provinces" [value]="p">
                          {{ p }}
                      </mat-option>
                  </mat-select>
              </mat-form-field>
          </div>
          <div>
              <mat-form-field>
                  <mat-select
                          placeholder="Please select city"
                          [(ngModel)]="_address.city"
                          (selectionChange)="onCityChange()"
                  >
                      <mat-option *ngFor="let c of (cities$ | async)" [value]="c">
                          {{ c }}
                      </mat-option>
                  </mat-select>
              </mat-form-field>
          </div>
          <div>
              <mat-form-field>
                  <mat-select
                          placeholder="Please select district"
                          [(ngModel)]="_address.district"
                          (selectionChange)="onDistrictChange()"
                  >
                      <mat-option *ngFor="let d of (districts$ | async)" [value]="d">
                          {{ d }}
                      </mat-option>
                  </mat-select>
              </mat-form-field>
          </div>
          <div class="street">
              <mat-form-field class="full-width">
                  <input
                          matInput
                          placeholder="street"
                          [(ngModel)]="_address.street"
                          (change)="onStreetChange()"
                  />
              </mat-form-field>
          </div>
      </div>
  `,
  styles: [
      `
          .street {
              flex: 1 1 100%;
          }

          .address-group {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              flex-direction: row;
              justify-content: space-between;
          }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaInputComponent),
      multi: true,
    }
  ],
})
export class AreaInputComponent implements OnInit, OnDestroy {

  /**
   * @description data of the component
   */
  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  };
  _province = new Subject<string>();
  _city = new Subject<string>();
  _district = new Subject<string>();
  _street = new Subject<string>();
  sub: Subscription;
  provinces: string[] = getProvinces();
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;

  constructor() {
  }

  ngOnInit() {
    // get the data from form
    const province$ = this._province.asObservable().pipe(startWith(''));
    const city$ = this._city.asObservable().pipe(startWith(''));
    const district$ = this._district.asObservable().pipe(startWith(''));
    const street$ = this._street.asObservable().pipe(startWith(''));
    const val$ = combineLatest([province$, city$, district$, street$]).pipe(
      map(([_p, _c, _d, _s]) => {
        return {
          province: _p,
          city: _c,
          district: _d,
          street: _s
        };
      })
    );
    this.sub = val$.subscribe(v => this.propagateChange(v));

    // update the data
    this.cities$ = province$.pipe(
      map((p: string) => getCities(p))
    );
    this.districts$ = combineLatest(province$, city$).pipe(
      map(([p, c]) => getDistricts(p, c))
    );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // -------------------------------表单相关的函数---------------------------- //

  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => {
  };

  // 设置初始值
  public writeValue(obj: Address) {
    if (obj) {
      // if we have initial value, send it out.
      if (this._address.province) {
        this._province.next(this._address.province);
      }
      if (this._address.city) {
        this._city.next(this._address.city);
      }
      if (this._address.district) {
        this._district.next(this._address.district);
      }
      if (this._address.street) {
        this._street.next(this._address.street);
      }
    }
  }

  public registerOnChange(fn: any): void {
  }

  public registerOnTouched(fn: any): void {
  }

  validate(fc: FormControl): { [key: string]: any } | null {
    const value = fc.value as Address;
    if (!value) {
      return {
        addressInvalid: 'Address is empty'
      };
    }
    if (value.province &&
      value.city &&
      value.district &&
      value.street &&
      value.street.length >= 4) {
      return null;
    }
    return {
      addressInvalid: true
    };
  }

  // ------------------------------rxjs 数据流处理--------------------------- //

  onProvinceChange() {
    this._province.next(this._address.province);
  }

  onCityChange() {
    this._city.next(this._address.city);
  }

  onDistrictChange() {
    this._district.next(this._address.district);
  }

  onStreetChange() {
    debugger;
    this._street.next(this._address.street);
  }

}
