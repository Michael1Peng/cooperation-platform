import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {getDate} from 'date-fns';

@Component({
  selector: 'app-sidebar',
  template: `
      <mat-nav-list>
          <h3 matSubheader>Project</h3>
          <mat-list-item [routerLink]="['/project']" (click)="onNavClick()">
              <mat-icon mat-list-icon svgIcon="projects"></mat-icon>
              <span mat-line>Project home page</span>
              <span mat-line matSubheader>Check all your projects</span>
          </mat-list-item>
          <h3 matSubheader>Calendar</h3>
          <mat-list-item>
              <span>Calendar home page</span>
          </mat-list-item>
          <mat-list-item [routerLink]="['/tasklist']" (click)="onNavClick()">
              <mat-icon mat-list-icon svgIcon="month"></mat-icon>
              <span mat-line>Month view</span>
              <span mat-line matSubheader>View projects in monthly view</span>
          </mat-list-item>
          <mat-list-item>
              <mat-icon mat-list-icon svgIcon="week"></mat-icon>
              <span mat-line>Week view</span>
              <span mat-line matSubheader>View projects in weekly view</span>
          </mat-list-item>
          <mat-list-item>
              <mat-icon mat-list-icon [svgIcon]="today"></mat-icon>
              <span mat-line>Day view</span>
              <span mat-line matSubheader>View projects in daily view</span>
          </mat-list-item>
      </mat-nav-list>

  `,
  styles: [`
      mat-icon {
          align-self: flex-start;
      }
  `]
})
export class SidebarComponent implements OnInit {

  today = 'day';
  @Output() navClick = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
    this.today += getDate(new Date());
  }

  onNavClick() {
    this.navClick.emit();
  }
}
