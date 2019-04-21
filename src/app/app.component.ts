import {Component} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Darkmode = false;

  constructor(private overlayContainer: OverlayContainer) {
  }

  switchMode(dark) {
    this.Darkmode = dark;
    this.overlayContainer.getContainerElement().classList.add('my-app-dark-theme');
    if (dark) {
      this.overlayContainer.getContainerElement().className = 'my-app-dark-theme';
    } else {
      this.overlayContainer.getContainerElement().className = null;
    }
  }
}
