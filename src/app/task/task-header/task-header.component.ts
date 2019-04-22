import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = '';
  @Output() newTaskEvent = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  onNewTask() {
    this.newTaskEvent.emit();
  }

}
