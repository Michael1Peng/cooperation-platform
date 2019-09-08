import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {QuoteService} from '../service/quote.service';
import * as actions from '../actions/quote.action';
import {catchError, map, switchMap, tap} from 'rxjs/operators';


@Injectable()
export class QuoteEffects {

  @Effect()
  quote$: Observable<Action> = this.action$.pipe(
    ofType<actions.QuoteAction>(actions.QUOTE),
    switchMap(() =>
      this.quoteService.getQuotes().pipe(
        map(quote => new actions.QuoteSuccessAction(quote[0])),
        catchError(err => of(new actions.QuoteFailAction(err)))
      )
    )
  );

  /**
   *
   * @param action$ provides an observable stream of all actions dispatched after the latest state has been reduced
   * @param quoteService service to get daily quote and img link
   */
  constructor(private action$: Actions, private quoteService: QuoteService) {
  }
}
