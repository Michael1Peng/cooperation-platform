import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuoteService} from './quote.service';
import {ProjectService} from './project.service';
import {TaskListService} from './taskList.service';
import {TaskService} from './task.service';
import {UserService} from './user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    QuoteService,
    ProjectService,
    TaskListService,
    TaskService,
    UserService
  ]
})
export class ServiceModule {
}
