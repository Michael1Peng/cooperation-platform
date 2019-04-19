import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
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
