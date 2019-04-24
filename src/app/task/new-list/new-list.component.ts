import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  title = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data) {
  }

  ngOnInit() {
    this.title = this.data.title;
    console.log(JSON.stringify(this.data.project));
  }

}
