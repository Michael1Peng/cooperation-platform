import {Component, OnInit, Output, EventEmitter, HostListener} from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {

  private desc: string;
  @Output() quickTaskEvent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  @HostListener('keyup.enter')
  onQuickTaskClick() {
    if (!this.desc || this.desc.length === 0 || !this.desc.trim()) {
      return;
    }
    this.quickTaskEvent.emit(this.desc);
    this.desc = '';
  }

}
