import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuoteService} from './quote.service';
import {ProjectService} from './project.service';
import {TaskListService} from './taskList.service';
import {TaskService} from './task.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    QuoteService,
    ProjectService,
    TaskListService,
    TaskService
  ]
})
export class ServiceModule {
}
