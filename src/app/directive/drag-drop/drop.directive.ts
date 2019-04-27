import {Directive, HostListener, ElementRef, Renderer2, Input, Output, EventEmitter} from '@angular/core';
import {DragData, DragDropService} from '../drag-drop.service';
import {take} from 'rxjs/operators';

@Directive({
  selector: '[appDropable][dropTags][dragEnterClass]'
})
export class DropDirective {

  @Input() dragEnterClass: string;
  @Input() dropTags: string[] = [];
  @Output() droppedEvent = new EventEmitter<DragData>();
  private data$;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private dragDropService: DragDropService
  ) {
    // TODO 'take' 函数
    this.data$ = this.dragDropService.getDragData().pipe(take(1));
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.elementRef.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        console.log(dragData);
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.renderer.addClass(this.elementRef.nativeElement, this.dragEnterClass);
        }
      });
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.elementRef.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.renderer.setProperty(event, 'dataTransfer.effectAllowed', 'all');
          this.renderer.setProperty(event, 'dataTransfer.dropEffect', 'move');
        } else {
          this.renderer.setProperty(event, 'dataTransfer.effectAllowed', 'none');
          this.renderer.setProperty(event, 'dataTransfer.dropEffect', 'none');
        }
      });
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.elementRef.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.renderer.removeClass(this.elementRef.nativeElement, this.dragEnterClass);
        }
      });
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.elementRef.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.renderer.removeClass(this.elementRef.nativeElement, this.dragEnterClass);
          this.droppedEvent.emit(dragData);
          this.dragDropService.clearDragData();
        }
      });
    }
  }
}
