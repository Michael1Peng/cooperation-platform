import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task} from '../domain';
import {Observable, concat} from 'rxjs';
import {reduce} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly domain = 'tasks';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(
    private httpClient: HttpClient,
    @Inject('RESOURCE') private resource) {
  }

  // POST
  add(task: Task): Observable<Task> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.post<Task>(url, JSON.stringify(task), {
      headers: this.headers
    });
  }

  // PUT
  update(task: Task): Observable<Task> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.put<Task>(url, JSON.stringify(task), {
      headers: this.headers
    });
  }

  // DELETE
  delete(task: Task): Observable<Task> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.delete<Task>(`${url}/${task.id}`, {
      headers: this.headers
    });
  }

  // GET
  get(taskListId: string): Observable<Task[]> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.get<Task[]>(`${url}/${taskListId}`, {
      headers: this.headers
    });
  }

  getFromProject(projectId: string): Observable<Task[]> {
    const url = `${this.resource.url}/${this.domain}/fromProject`;
    return this.httpClient.get<Task[]>(`${url}/${projectId}`, {
      headers: this.headers
    });
  }

  complete(task: Task): Observable<Task> {
    task.completed = !task.completed;
    return this.update(task);
  }

  move(task: Task, taskListId: string): Observable<Task> {
    task.taskListId = taskListId;
    return this.update(task);
  }

  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    const url = `${this.resource.uri}/${this.domain}/moveAll/`;

    const moveAlRequest = {
      srcListId,
      targetListId
    };
    return this.httpClient.put<Task[]>(url, JSON.stringify(moveAlRequest), {
      headers: this.headers
    });
  }

}
