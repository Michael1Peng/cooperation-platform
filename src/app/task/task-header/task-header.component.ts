import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = '';
  @Output() newTaskEvent = new EventEmitter<void>();
  @Output() moveListEvent = new EventEmitter<void>();
  @Output() deleteListEvent = new EventEmitter<void>();
  @Output() editListEvent = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  onNewTask() {
    this.newTaskEvent.emit();
  }

  onMoveList() {
    this.moveListEvent.emit();
  }

  onDeleteList() {
    this.deleteListEvent.emit();
  }

  onEditList() {
    this.editListEvent.emit();
  }

}
