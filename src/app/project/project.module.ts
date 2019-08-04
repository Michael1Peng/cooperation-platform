import {NgModule} from '@angular/core';
import {ListComponent} from './list.component';
import {ItemComponent} from './item.component';
import {NewProjectComponent} from './new-project.component';
import {InviteComponent} from './invite.component';
import {SharedModule} from '../shared/shared.module';
import {ProjectRoutingModule} from './project-routing.module';

@NgModule({
  declarations: [ListComponent, ItemComponent, NewProjectComponent, InviteComponent],
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  entryComponents: [
    NewProjectComponent,
    InviteComponent
  ]
})
export class ProjectModule {
}
