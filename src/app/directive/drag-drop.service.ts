import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface DragData {
  tag: string;
  data: any;
}

@Injectable()
export class DragDropService {
  private dragData = new BehaviorSubject<DragData>(null);

  setDragData(data: DragData) {
    this.dragData.next(data);
  }

  getDragData(): Observable<DragData> {
    return this.dragData.asObservable();
  }

  clearDragData() {
    this.dragData.next(null);
  }
}
