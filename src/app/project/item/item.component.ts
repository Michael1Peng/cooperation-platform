import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Output() inviteEvent = new EventEmitter<void>();

  constructor() {
  }

  @Input() item;

  ngOnInit() {
  }

  onInviteClick() {
    this.inviteEvent.emit();
  }
}
