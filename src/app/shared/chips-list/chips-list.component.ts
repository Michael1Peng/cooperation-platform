import {ChangeDetectionStrategy, Component, OnInit, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {UserService} from '../../service/user.service';
import {User} from '../../domain';
import {startWith, debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-chips-list',
  template: `
    <div [formGroup]="chips" class="full-width">
      <span>{{ label }}</span>
      <mat-chip-list>
        <mat-chip color="primary" selected="true" *ngFor="let member of items">
          {{ member.name }} <span (click)="removeMember(member)" class="remove-tag">x</span>
        </mat-chip>
      </mat-chip-list>
      <mat-form-field *ngIf="displayInput" class="full-width">
        <input matInput [placeholder]="placeholderText" [matAutocomplete]="autoMember" formControlName="memberSearch">
      </mat-form-field>
    </div>
    <mat-autocomplete #autoMember="matAutocomplete" [displayWith]="displayUser">
      <mat-option
        *ngFor="let item of memberResults$ | async"
        [value]="item"
        (onSelectionChange)="handleMemberSelection(item)">
        {{ item.name }}
      </mat-option>
    </mat-autocomplete>
  `,
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    }
  ],
})
export class ChipsListComponent implements ControlValueAccessor, OnInit {

  @Input() multiple = true; // define whether we can select multiple choices.
  @Input() label = 'Add/Modify members';
  @Input() placeholderText = 'Please input members\' email';
  items: User[] = [];
  chips: FormGroup;
  memberResults$: Observable<User[]>; // result from searching

  constructor(
    private fb: FormBuilder,
    private service: UserService
  ) {
  }

  ngOnInit() {
    this.chips = this.fb.group({
      memberSearch: ['']
    });
    this.memberResults$ = this.searchUsers(this.chips.controls.memberSearch.valueChanges);
  }

  // -------------------------------表单相关的函数---------------------------- //

  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => {
  };

  // 设置初始值
  public writeValue(obj: User[]) {
    obj = obj ? obj : [];
    if (this.multiple) {
      const selectedUsers: { [id: string]: User } = obj.reduce((selected, user) => {
        return {...selected, [user.id as string]: user};
      }, {});

      const remaining = this.items.filter(user => !selectedUsers[user.id]);
      this.items = remaining.concat(obj);
    } else {
      this.items = obj;
    }
  }

  public registerOnChange(fn: any): void {
  }

  public registerOnTouched(fn: any): void {
  }

  validate(fc: FormControl) {
    return this.items ? null : {
      chipsListInvalid: {
        valid: false,
      }
    };
  }

  // -----------------------------chipsList 成员的相关操作----------------------------- //

  private removeMember(user: User) {
    const index = this.items.indexOf(user);
    if (this.multiple) {
      this.items.splice(index, 1);
    } else {
      this.items = [];
    }
    this.chips.patchValue({memberSearch: ''});
    this.propagateChange(this.items);
  }

  handleMemberSelection(user: User) {
    console.log(user);
    console.log(this.items);
    if (this.items.indexOf(user) > -1) {
      return;
    }
    if (this.multiple) {
      this.items.push(user);
    } else {
      this.items = [user];
    }
    this.chips.patchValue({memberSearch: user.name});
    this.propagateChange(this.items);
  }

  displayUser(user: User): string {
    return user ? user.name as string : '';
  }

  get displayInput() {
    return this.multiple || (this.items.length === 0);
  }

  searchUsers(obs: Observable<string>): Observable<User[]> {
    return obs
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        filter((s: string) => (s !== null || s !== undefined) && s.length > 1),
        switchMap(str => this.service.getUsersByEmail(str))
      );
  }
}
