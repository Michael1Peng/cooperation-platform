import {Component, OnInit, HostBinding} from '@angular/core';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {routeanimation} from '../../animations/route.animations';
import {projectListAnimation} from '../../animations/projectList.animations';
import {ProjectService} from '../../service/project.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    routeanimation,
    projectListAnimation
  ]
})
export class ListComponent implements OnInit {

  @HostBinding('@route') state;

  constructor(
    private dialog: MatDialog,
    private projectService$: ProjectService) {
  }

  projects;

  ngOnInit() {
    this.projectService$.get('1').subscribe(projects => this.projects = projects);
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
