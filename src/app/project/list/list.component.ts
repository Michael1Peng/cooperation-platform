import {Component, OnInit} from '@angular/core';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  projects = [
    {
      name: '企业协作平台',
      desc: '这是一个企业内部项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      name: '自动化测试项目',
      desc: '这是一个企业内部项目',
      coverIng: 'assets/img/covers/1.jpg'
    }
  ];

  ngOnInit() {
  }

  openNewProject() {
    this.dialog.open(NewProjectComponent, {data: {title: 'Build a new project'}});
  }

  inviteNewMember() {
    this.dialog.open(InviteComponent);
  }

  editProject(project) {
    this.dialog.open(NewProjectComponent, {data: {title: 'Edit the project', project}});
  }

  deleteProjectConfirm(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete the project',
        content: 'Are you sure to delete the project?'
      }
    });

    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

}
