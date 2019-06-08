import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../domain';
import {Observable, concat} from 'rxjs';
import {reduce} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly domain = 'users';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(
    private httpClient: HttpClient,
    @Inject('RESOURCE') private resource) {
  }

  // POST
  add(user: User): Observable<User> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.post<User>(url, JSON.stringify(user), {
      headers: this.headers
    });
  }

  // PUT
  addProjectRef(user: User, projectId: string): Observable<User> {
    const url = `${this.resource.uri}/${this.domain}/${user.id}/addProjectRef`;

    const params = {
      user,
      projectId
    };
    return this.httpClient.post<User>(url, JSON.stringify(params), {headers: this.headers});
  }

  removeProjectRef(user: User, projectId: string): Observable<User> {
    const url = `${this.resource.uri}/${this.domain}/${user.id}/removeProjectRef`;

    const params = {
      user,
      projectId
    };
    return this.httpClient.put<User>(url, JSON.stringify(params), {headers: this.headers});
  }

  // DELETE
  delete(user: User): Observable<User> {
    const url = `${this.resource.url}/${this.domain}`;
    return this.httpClient.delete<User>(`${url}/${user.id}`, {
      headers: this.headers
    });
  }

  // GET
  getUsersByProject(projectId: string): Observable<User[]> {
    const uri = `${this.resource.url}/${this.domain}/byProjectId/`;
    const params = new HttpParams().set('projectId', projectId);
    return this.httpClient.post<User[]>(uri, {params});
  }

  getUsersByEmail(emailLike: string): Observable<User[]> {
    const uri = `${this.resource.url}/${this.domain}/byEmail/`;
    const params = new HttpParams().set('emailLike', emailLike);
    return this.httpClient.get<User[]>(uri, {params});
  }

}
