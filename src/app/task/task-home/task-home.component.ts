import {Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewTaskComponent} from '../new-task/new-task.component';
import {CopyTaskComponent} from '../copy-task/copy-task.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {NewListComponent} from '../new-list/new-list.component';
import {routeanimation} from '../../animations/route.animations';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    routeanimation
  ]
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          desc: '任务一: 去星巴克买杯咖啡',
          completed: true,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          priority: 3,
          dueDate: new Date(),
          reminder: true,
        },
        {
          desc: '任务二: 完成老师布置的PPT作业',
          completed: false,
          owner: {
            id: 2,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          priority: 2,
          dueDate: new Date(),
          reminder: false
        }
      ]
    },
    {
      id: 2,
      name: '进行中',
      tasks: [
        {
          desc: '任务三: 项目代码评审',
          completed: false,
          owner: {
            id: 1,
            name: '王五',
            avatar: 'avatars:svg-13'
          },
          priority: 2,
          dueDate: new Date(),
          reminder: false
        },
        {
          desc: '任务四: 制定项目计划',
          completed: false,
          owner: {
            id: 2,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          priority: 1,
          dueDate: new Date(),
          reminder: false
        }
      ]
    }

  ];
  @HostBinding('@route') state;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  createNewTask() {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'Build a new task'}});
  }

  moveList() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }

  editTask(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'Edit the task', task}});
  }

  deleteListConfirm(list) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete the list',
        content: 'Are you sure to delete the list?'
      }
    });

    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  editList(list) {
    const dialogRef = this.dialog.open(NewListComponent, {data: {title: 'Edit the list', task: list}});
  }

  createNewList() {
    const dialogRef = this.dialog.open(NewListComponent, {data: {title: 'Build a new list'}});
  }

}
