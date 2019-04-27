import {Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener} from '@angular/core';
import {cardanimation} from '../../animations/card.animations';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [
    cardanimation
  ]
})
export class ItemComponent implements OnInit {

  @Output() inviteEvent = new EventEmitter<void>();
  @Output() editEvent = new EventEmitter<void>();
  @Output() deleteProjectEvent = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';

  constructor() {
  }

  @Input() item;

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

  onInviteClick() {
    this.inviteEvent.emit();
  }

  onEditClick() {
    this.editEvent.emit();
  }

  onDeleteClick() {
    this.deleteProjectEvent.emit();
  }
}
