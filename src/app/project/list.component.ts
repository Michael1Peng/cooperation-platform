import {Component, OnInit, HostBinding, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {NewProjectComponent} from './new-project.component';
import {InviteComponent} from './invite.component';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../shared/confirm-dialog.component';
import {routeanimation} from '../animations/route.animations';
import {projectListAnimation} from '../animations/projectList.animations';
import {ProjectService} from '../service/project.service';
import {Observable, range, Subscription} from 'rxjs';
import {map, reduce} from 'rxjs/operators';
import 'rxjs-compat/add/operator/take';
import 'rxjs-compat/add/operator/filter';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/switchMap';

/**
 * display the list of projects.
 * */

@Component({
  selector: 'app-list',
  template: `
      <div class="project-list-container" [@projectListAnimation]='projects?.length'>
          <app-item
                  *ngFor="let project of projects"
                  [item]="project" class="card"
                  (inviteEvent)="inviteNewMember()"
                  (editEvent)="editProject(project)"
                  (deleteProjectEvent)="deleteProjectConfirm(project)"
          >

          </app-item>
      </div>

      <button class="fab-button" mat-fab type="button" (click)="openNewProject()">
          <mat-icon>add</mat-icon>
      </button>
  `,
  styles: [`
      .card {
          height: 360px;
          flex: 0 0 360px;
          margin: 10px;
          display: flex;
      }

      .project-list-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
      }

      .fab-button {
          position: fixed;
          right: 32px;
          bottom: 96px;
          z-index: 998;
      }
  `],
  animations: [
    routeanimation,
    projectListAnimation
  ]
})
export class ListComponent implements OnInit, OnDestroy {

  @HostBinding('@route') state;

  constructor(
    private dialog: MatDialog,
    private projectService$: ProjectService,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  projects = [];
  sub: Subscription;

  ngOnInit() {
    this.sub = this.projectService$.get('1').subscribe(projects => {
      this.projects = projects;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  openNewProject() {
    const img = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const thumbnails$ = this.getThumbnailsObs();
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {thumbnails: thumbnails$, img}
    });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(project => ({...project, coverImg: this.buildImg(project.coverImg)}))
      .switchMap(project => {
        return this.projectService$.add(project);
      })
      .subscribe(project => {
        this.projects.push(project);
        console.log(project);
      });
  }

  inviteNewMember() {
    this.dialog.open(InviteComponent, {data: {members: []}});
  }

  editProject(project) {
    const thumbnails$ = this.getThumbnailsObs();
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {thumbnails: thumbnails$, project}
    });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(p => ({...p, coverImg: this.buildImg(p.coverImg)}))
      .switchMap(p => {
        return this.projectService$.update(p);
      })
      .subscribe(p => {
        const index = this.projects.map(item => item.id).indexOf(p.id);
        this.projects[index] = p;
        console.log(p);
      });
  }

  deleteProjectConfirm(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete the project',
        content: 'Are you sure to delete the project?'
      }
    });

    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .switchMap(p => {
        return this.projectService$.delete(p);
      })
      .subscribe(p => {
        this.projects = this.projects.filter(item => item.id !== p.id);
        console.log(p);
      });
  }

  private getThumbnailsObs(): Observable<string[]> {
    return range(0, 40).pipe(
      map(i => `/assets/img/covers/${i}_tn.jpg`),
      reduce((r: string[], x: string) => {
        return [...r, x];
      }, [])
    );
  }

  private buildImg(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }
}
