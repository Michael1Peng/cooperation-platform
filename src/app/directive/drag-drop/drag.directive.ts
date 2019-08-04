import {Directive, HostListener, ElementRef, Renderer2, Input} from '@angular/core';
import {DragDropService} from '../drag-drop.service';

@Directive({
  selector: '[appDraggable][dragData][dragTag][draggedClass]'
})
export class DragDirective {

  @Input() draggedClass: string;
  @Input() dragTag: string;
  @Input() dragData: any;

  private isDraggable = false;

  @Input('appDraggable')
  set isDraggableFunc(val: boolean) {
    this.isDraggable = val;
    this.renderer.setAttribute(this.elementRef.nativeElement, 'draggable', `${this.isDraggable}`);
  }

  get isDraggableFunc() {
    return this.isDraggable;
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private dragDropService: DragDropService
  ) {
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: Event) {
    if (event.target === this.elementRef.nativeElement) {
      this.renderer.addClass(this.elementRef.nativeElement, this.draggedClass);
      this.dragDropService.setDragData({
        tag: this.dragTag,
        data: this.dragData
      });
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: Event) {
    if (event.target === this.elementRef.nativeElement) {
      this.renderer.removeClass(this.elementRef.nativeElement, this.draggedClass);
    }
  }

}
