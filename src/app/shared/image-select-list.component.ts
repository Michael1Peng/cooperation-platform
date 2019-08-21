import {Component, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl} from '@angular/forms';

/**
 * @description this component is to offer an user interface to select image or avatar.
 * @param items the list of urls of images
 * @param title the title of component
 * @param useSvgIcon to decide whether to select image or avatar
 */

@Component({
  selector: 'app-image-select-list',
  template: `
      <div>
          <span>{{title}}</span>
          <mat-icon
                  class="avatar"
                  [svgIcon]="selectedItem"
                  *ngIf="useSvgIcon
          else selectedImg">
          </mat-icon>
          <ng-template #selectedImg>
              <img [src]="selectedItem" alt="image item" [ngStyle]="{'width': itemWidth}">
          </ng-template>
      </div>

      <div class="scroll-container">
          <mat-grid-list [cols]="cols" [rowHeight]="rowHeight">
              <mat-grid-tile *ngFor="let item of items; let i = index">
                  <div class="image-container" (click)="onSelectImage(i)">
                      <mat-icon
                              class="avatar"
                              [svgIcon]="item"
                              *ngIf="useSvgIcon
          else imgItem">
                      </mat-icon>
                      <ng-template #imgItem>
                          <img [src]="item" alt="image item" [ngStyle]="{'width': itemWidth}">
                      </ng-template>
                      <div class="after">
                          <div class="zoom">
                              <mat-icon>checked</mat-icon>
                          </div>
                      </div>
                  </div>
              </mat-grid-tile>
          </mat-grid-list>
      </div>
  `,
  styles: [`
      mat-icon.avatar {
          overflow: hidden;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          margin: 12px;
      }

      .scroll-container {
          overflow-y: scroll;
          height: 200px;
      }

      .image-container {
          position: relative;
          display: inline-block;
      }

      .image-container .after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: none;
          color: #FFF;
      }

      .image-container:hover .after {
          display: block;
          background: rgba(0, 0, 0, 0.6);
      }

      .image-container .after .zoom {
          color: #DDD;
          font-size: 48px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -30px 0 0 -19px;
          height: 50px;
          width: 45px;
          cursor: pointer;
      }

      .image-container .after .zoom:hover {
          color: #FFF;
      }

      .cover {
          width: 150px;
      }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageSelectListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageSelectListComponent),
      multi: true
    }
  ]
})
export class ImageSelectListComponent implements ControlValueAccessor {

  @Input() items: string[] = []; // The paths to get resources.
  @Input() cols = 6; // How many items do we have in one row.
  @Input() rowHeight = '64px';
  @Input() title = 'Select';
  @Input() useSvgIcon = true; // Whether to use svg or img.
  @Input() itemWidth = '80px';
  selectedItem: string;
  private propagateChange = (_: any) => {
  };

  constructor() {
    console.log(this.items);
  }

  onSelectImage(i) {
    this.selectedItem = this.items[i];
    this.propagateChange(this.selectedItem);
  }

  writeValue(obj: any): void {
    this.selectedItem = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  validate(formControl: FormControl): { [key: string]: any } {
    return this.selectedItem ? null : {
      imageListInvalid: {
        valid: false
      }
    };
  }
}
