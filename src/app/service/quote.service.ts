import { Injectable , Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Quote} from '../domain/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private httpClient: HttpClient, @Inject('RESOURCE') private resource) { }

  getQuotes(): Observable<Quote> {
    const url = `${this.resource.url}motto/${Math.floor(Math.random() * 10)}`;
    return this.httpClient.get<Quote>(url);
  }
}
