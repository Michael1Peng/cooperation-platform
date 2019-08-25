import {ChangeDetectionStrategy, Component, OnInit, forwardRef, Input, ViewChild, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable, Subject, Subscription} from 'rxjs';
import {Identity, IdentityType} from '../domain';
import {isValidDate} from '../utils/date.util';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-identity-input',
  template: `
      <div>
          <mat-form-field>
              <mat-select
                      placeholder="证件类型"
                      (selectionChange)="onIdTypeChange($event.value)"
                      [(ngModel)]="identity.identityType"
              >
                  <mat-option *ngFor="let type of identityTypes" [value]="type.value">
                      {{ type.label }}
                  </mat-option>
              </mat-select>
          </mat-form-field>
      </div>
      <div class="id-input">
          <mat-form-field class="full-width">
              <input
                      matInput
                      type="text"
                      placeholder="证件号码"
                      (change)="onIdNoChange($event.target.value)"
                      [(ngModel)]="identity.identityNo"
              />
              <mat-error>证件号码输入有误</mat-error>
          </mat-form-field>
      </div>
  `,
  styles: [
      `
          .id-input {
              flex: 1;
          }

          :host {
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              align-items: baseline;
          }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    }
  ],
})
export class IdentityInputComponent implements OnInit, OnDestroy {

  // ----------------------------------组件数据------------------------------- //
  identityTypes: { value: IdentityType; label: string }[] = [
    {value: IdentityType.IdCard, label: '身份证'},
    {value: IdentityType.Insurance, label: '医保'},
    {value: IdentityType.Passport, label: '护照'},
    {value: IdentityType.Military, label: '军官证'},
    {value: IdentityType.Other, label: '其它'}
  ];
  identity: Identity = {identityType: null, identityNo: null};

  // rxjs 数据流
  private _selectedIdType = new Subject<IdentityType>();
  private _IdNum = new Subject<string>();
  private _sub: Subscription;

  constructor() {
  }

  ngOnInit() {
    const idType$ = this.idType;
    const idNo$ = this.idNum;
    const val$ = combineLatest(idType$, idNo$).pipe(
      map(([_selectedIdType, _IdNum]) => ({
        identityType: _selectedIdType,
        identityNo: _IdNum
      }))
    );
    this._sub = val$.subscribe(val => {
      this.propagateChange(val);
    });
  }

  ngOnDestroy(): void {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  // -------------------------------表单相关的函数---------------------------- //

  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => {
  };

  // 设置初始值
  public writeValue(obj: any) {
    if (obj) {
      this.identity = obj;
    }
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  validate(fc: FormControl): { [key: string]: any } | null {
    if (!fc.value) {
      return null;
    }
    switch (fc.value.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdNumber(fc);
      }
      case IdentityType.Passport: {
        return this.validatePassport(fc);
      }
      case IdentityType.Military: {
        return this.validateMilitary(fc);
      }
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }

  // ───┬
  //    └──── 用于验证输入的证件号码

  validateIdNumber(fc: FormControl): { [key: string]: any } | null {
    const val = fc.value.identityNo;
    if (val.length !== 18) {
      return {
        idInvalid: true
      };
    }
    const idCardPattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([012]\d)|3[0-1])\d{3}[x0-9]$/;
    if (idCardPattern.test(val)) {
      return null;
    } else {
      return {
        idInvalid: true
      };
    }
  }

  private validatePassport(c: FormControl): { [key: string]: any } | null {
    const value = c.value.identityNo;
    if (value.length !== 9) {
      return {idNotValid: true};
    }
    const pattern = /^[GgEe]\d{8}$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid: true};
  }

  private validateMilitary(c: FormControl): { [key: string]: any } | null {
    const value = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid: true};
  }

  // ------------------------------rxjs 数据流处理--------------------------- //

  onIdTypeChange(idType: IdentityType) {
    this._selectedIdType.next(idType);
  }

  onIdNoChange(idNum: string) {
    this._IdNum.next(idNum);
  }

  private get idType(): Observable<IdentityType> {
    return this._selectedIdType.asObservable();
  }

  private get idNum(): Observable<string> {
    return this._IdNum.asObservable();
  }

}
