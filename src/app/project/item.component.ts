import {Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener} from '@angular/core';
import {cardanimation} from '../animations/card.animations';

/**
 * show the information of each project,
 * and offer accesses to operate them.
 * */

@Component({
  selector: 'app-item',
  template: `
      <mat-card>
          <mat-card-header>
              <mat-card-title>
                  {{item.name}}
              </mat-card-title>
          </mat-card-header>
          <img mat-card-image [src]="item.coverImg">
          <mat-card-content>
              {{item.desc}}
          </mat-card-content>
          <mat-card-actions>
              <button mat-button type="button" (click)="onEditClick()">
                  <mat-icon>note</mat-icon>
                  <span>Edit</span>
              </button>
              <button mat-button type="button" (click)="onInviteClick()">
                  <mat-icon>group_add</mat-icon>
                  <span>Invite</span>
              </button>
              <button mat-button type="button" (click)="onDeleteClick()">
                  <mat-icon>delete</mat-icon>
                  <span>Delete</span>
              </button>
          </mat-card-actions>
      </mat-card>
  `,
  styles: [``],
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
    console.log(this.item);
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
