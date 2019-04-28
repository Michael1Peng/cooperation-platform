import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TaskHomeComponent} from './task-home/task-home.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskItemComponent} from './task-item/task-item.component';
import {TaskHeaderComponent} from './task-header/task-header.component';
import {MatMenuModule} from '@angular/material';
import {TaskRoutingModule} from './task-routing.module';
import {NewTaskComponent} from './new-task/new-task.component';
import {CopyTaskComponent} from './copy-task/copy-task.component';
import {NewListComponent} from './new-list/new-list.component';
import { QuickTaskComponent } from './quick-task/quick-task.component';

@NgModule({
  declarations: [
    TaskHomeComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskHeaderComponent,
    NewTaskComponent,
    CopyTaskComponent,
    NewListComponent,
    QuickTaskComponent
  ],
  imports: [
    SharedModule,
    MatMenuModule,
    TaskRoutingModule
  ],
  entryComponents: [
    NewTaskComponent,
    NewListComponent,
    CopyTaskComponent
  ]
})
export class TaskModule {
}
