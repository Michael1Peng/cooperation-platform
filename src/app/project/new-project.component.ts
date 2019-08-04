import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-project',
  template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit(form, $event)">
          <h2 mat-dialog-title>{{title}}</h2>
          <mat-dialog-content>
              <mat-form-field color="accent" class="full-width">
                  <input matInput type="text" placeholder="Project Name" formControlName="name">
              </mat-form-field>
              <mat-form-field color="accent" class="full-width">
                  <input matInput type="text" placeholder="Project Description" formControlName="desc">
              </mat-form-field>
              <app-image-select-list
                      [useSvgIcon]="false"
                      [cols]="6"
                      [title]="'Choose your cover: '"
                      [items]="thumbnails$ | async"
                      formControlName="coverImg"
              >
              </app-image-select-list>
          </mat-dialog-content>
          <mat-dialog-actions>
              <button mat-raised-button type="submit" color="primary" [disabled]="!form.valid">Save</button>
              <button mat-button mat-dialog-close type="button">Close</button>
          </mat-dialog-actions>
      </form>
  `,
  styles: [``]
})
export class NewProjectComponent implements OnInit {

  form: FormGroup;
  title = '';
  thumbnails$: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>) {
    this.thumbnails$ = this.data.thumbnails;
  }

  ngOnInit() {
    if (this.data.project) {
      this.form = this.formBuilder.group({
        name: [this.data.project.name, Validators.compose([Validators.required, Validators.maxLength(20)])],
        desc: [this.data.project.desc, Validators.maxLength(40)],
        coverImg: [this.data.project.coverImg, Validators.required]
      });
      this.title = 'Modify Project:';
    } else {
      this.form = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
        desc: ['', Validators.maxLength(40)],
        coverImg: [this.data.img, Validators.required]
      });
      this.title = 'New Project:';
    }
  }

  onSubmit({value, valid}: FormGroup, event: Event) {
    event.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }
}
