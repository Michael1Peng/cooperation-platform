import {ChangeDetectionStrategy, Component, OnInit, forwardRef, Input, ViewChild, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {combineLatest, Observable, Subject} from 'rxjs';
import {Address} from '../../domain';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-area-input',
  template: `
    <div class="address-group">
      <div>
        <mat-form-field>
          <mat-select
            placeholder="Please select province"
            [(ngModel)]="_address.province"
            (change)="onProvinceChange()"
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
            (change)="onCityChange()"
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
            (change)="onDistrictChange()"
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

  // ----------------------------------组件数据------------------------------- //
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

  constructor() {
  }

  ngOnInit() {
    const province$ = this._province.asObservable().pipe(startWith(''));
    const city$ = this._city.asObservable().pipe(startWith(''));
    const district$ = this._district.asObservable().pipe(startWith(''));
    const street$ = this._street.asObservable().pipe(startWith(''));
    const val$ = combineLatest([province$, city$, district$, street$]).pipe(
      map(([_p, _c, _d, _s]) => {

      })
    );
  }

  ngOnDestroy(): void {
  }

  // -------------------------------表单相关的函数---------------------------- //

  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => {
  };

  // 设置初始值
  public writeValue(obj: Address) {
    this._address = obj ? obj : null;
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
    this._street.next(this._address.street);
  }

}
