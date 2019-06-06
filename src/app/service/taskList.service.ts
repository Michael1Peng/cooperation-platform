import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskList} from '../domain';
import {Observable, concat} from 'rxjs';
import {reduce} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private readonly domain = 'taskList';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(
    private httpClient: HttpClient,
    @Inject('RESOURCE') private resource) {
  }

  // POST
  add(taskList: TaskList): Observable<TaskList> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.post<TaskList>(url, JSON.stringify(taskList), {
      headers: this.headers
    });
  }

  // PUT
  update(taskList: TaskList): Observable<TaskList> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.put<TaskList>(url, JSON.stringify(taskList), {
      headers: this.headers
    });
  }

  // DELETE
  delete(taskList: TaskList): Observable<TaskList> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.delete<TaskList>(`${url}/${taskList.id}`, {
      headers: this.headers
    });
  }

  // GET
  get(projectId: string): Observable<TaskList[]> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.get<TaskList[]>(`${url}/${projectId}`, {
      headers: this.headers
    });
  }

  swapOrder(src: TaskList, dest: TaskList): Observable<TaskList[]> {
    const temp = src.order;
    src.order = dest.order;
    dest.order = temp;

    const drag$ = this.update(src);
    const drop$ = this.update(dest);

    return concat(drag$, drop$).pipe(
      reduce((r: TaskList[], x: TaskList) => [...r, x], [])
    );

  }
}
