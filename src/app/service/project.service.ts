import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../domain';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly domain = 'project';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(
    private httpClient: HttpClient,
    @Inject('RESOURCE') private resource) {
  }

  // POST
  add(project: Project): Observable<Project> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.post<Project>(url, JSON.stringify(project), {
      headers: this.headers
    });
  }

  // PUT
  update(project: Project): Observable<Project> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.put<Project>(url, JSON.stringify(project), {
      headers: this.headers
    });
  }

  // DELETE
  delete(project: Project): Observable<Project> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.delete<Project>(`${url}/${project.id}`, {
      headers: this.headers
    });
  }

  // GET
  get(userId: string): Observable<Project[]> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.get<Project[]>(`${url}/${userId}`, {
      headers: this.headers
    });
  }
}
