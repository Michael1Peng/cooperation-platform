import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {itemanimation} from '../../project/animations/item.animations';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemanimation
  ]
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Input() avatar;
  @Output() itemClick = new EventEmitter<void>();
  leftBorderState = 'out';

  constructor() {
  }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

  itemClickEvent() {
    this.itemClick.emit();
  }

  checkBoxClickEvent(event: Event) {
    event.stopPropagation();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.leftBorderState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.leftBorderState = 'out';
  }
}
