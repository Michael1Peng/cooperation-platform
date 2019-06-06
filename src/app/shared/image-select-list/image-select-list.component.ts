import {Component, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl} from '@angular/forms';

@Component({
  selector: 'app-image-select-list',
  templateUrl: './image-select-list.component.html',
  styleUrls: ['./image-select-list.component.scss'],
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
