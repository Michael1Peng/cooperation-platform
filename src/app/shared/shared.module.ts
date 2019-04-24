import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule,
  MatToolbarModule, MatTooltipModule,
  MatRadioModule,
  MatDatepickerModule, MatDialogModule,
  MatNativeDateModule, MatSelectModule
} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class SharedModule {
}
