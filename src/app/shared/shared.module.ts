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
  MatSidenavModule,
  MatButtonToggleModule, MatChipsModule,
  MatTabsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {DirectiveModule} from '../directive/directive.module';
import {ImageSelectListComponent} from './image-select-list.component';
import {AgeInputComponent} from './age-input.component';
import {ChipsListComponent} from './chips-list.component';
import {IdentityInputComponent} from './identity-input.component';
import {AreaInputComponent} from './area-input.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ImageSelectListComponent,
    AgeInputComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaInputComponent
  ],
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
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatTabsModule
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
    ImageSelectListComponent,
    MatButtonToggleModule,
    AgeInputComponent,
    ChipsListComponent,
    MatChipsModule,
    IdentityInputComponent,
    AreaInputComponent,
    MatTabsModule
  ]
})
export class SharedModule {
}
