import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
      <mat-toolbar color="primary">
          <button mat-icon-button (click)="openSidebar()">
              <mat-icon>menu</mat-icon>
          </button>
          <span>cooperation-platform</span>
          <span class="fill-remaining-space"></span>
          <mat-slide-toggle (change)="onChangemode($event.checked)">Dark mode</mat-slide-toggle>
      </mat-toolbar>
  `,
  styles: [``]
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkmode = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  openSidebar() {
    this.toggle.emit();
  }

  onChangemode(checked: boolean) {
    this.toggleDarkmode.emit(checked);
  }

}
