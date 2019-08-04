import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../domain';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-invite',
  template: `
    <h2 mat-dialog-title>{{dialogTitle}}</h2>
    <form
      class="full-width"
      #f="ngForm"
      (ngSubmit)="onSubmit($event, f)"
    >
      <mat-dialog-content>
        <app-chips-list
          [label]="'Invite members'"
          name="members"
          [(ngModel)]="members"
        >
        </app-chips-list>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-raised-button type="submit" color="primary" [disabled]="!f.valid">Save</button>
        <button mat-button mat-dialog-close type="button">Close</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [``]
})
export class InviteComponent implements OnInit {

  members: User[] = [];
  dialogTitle: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<InviteComponent>) {
  }

  ngOnInit() {
    this.members = [...this.data.members];
    this.dialogTitle = this.data.dialogTitle ? this.data.dialogTitle : 'Invite a member';
  }

  displayUser(user: { id: string, name: string }) {
    return user ? user.name : '';
  }

  onSubmit(ev: Event, {value, valid}: NgForm ) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }
}
