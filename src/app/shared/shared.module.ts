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
  MatNativeDateModule, MatSelectModule,
  MatSidenavModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {DirectiveModule} from '../directive/directive.module';
import {ImageSelectListComponent} from './image-select-list/image-select-list.component';


@NgModule({
  declarations: [ConfirmDialogComponent, ImageSelectListComponent],
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
    MatSelectModule,
    MatSidenavModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule
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
    MatSelectModule,
    MatSidenavModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ImageSelectListComponent
  ]
})
export class SharedModule {
}
