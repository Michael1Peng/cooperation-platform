import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    this.overlayContainer.getContainerElement().classList.add('my-app-dark-theme');
    if (this.data.dark) {
      this.overlayContainer.getContainerElement().className = 'my-app-dark-theme';
    } else {
      this.overlayContainer.getContainerElement().className = null;
    }
  }

}
