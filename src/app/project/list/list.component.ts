import {Component, OnInit} from '@angular/core';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {MatDialog} from '@angular/material';

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
    this.dialog.open(NewProjectComponent, {data: {dark: true}});
  }

  inviteNewMember() {
    this.dialog.open(InviteComponent);
  }
}
