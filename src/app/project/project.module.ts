import {NgModule} from '@angular/core';
import {ListComponent} from './list/list.component';
import {ItemComponent} from './item/item.component';
import {NewProjectComponent} from './new-project/new-project.component';
import {InviteComponent} from './invite/invite.component';
import {SharedModule} from '../shared/shared.module';
import {ProjectRoutingModule} from './project-routing.module';
import {MatAutocompleteModule, MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [ListComponent, ItemComponent, NewProjectComponent, InviteComponent],
  imports: [
    SharedModule,
    ProjectRoutingModule,
    MatDialogModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    NewProjectComponent,
    InviteComponent
  ]
})
export class ProjectModule {
}
