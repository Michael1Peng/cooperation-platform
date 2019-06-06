import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
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
