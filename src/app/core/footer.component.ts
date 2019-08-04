import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
      <mat-toolbar color="primary">
          <span class="fill-remaining-space"></span>
          <span>&copy; Michael </span>
          <span class="fill-remaining-space"></span>
      </mat-toolbar>
  `,
  styles: [``]
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
