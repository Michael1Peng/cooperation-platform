import {Quote} from '../domain';
import {Action} from '@ngrx/store';

/**
 * @description actions for quote store
 */
export const QUOTE = '[Quote] Quote';                   // initial state
export const QUOTE_SUCCESS = '[Quote] Quote success';   // fetch quote successfully
export const QUOTE_FAIL = '[Quote] Quote fail';         // fail to fetch quote

export class QuoteAction implements Action {
  readonly type = QUOTE;
}

export class QuoteSuccessAction implements Action {
  readonly type = QUOTE_SUCCESS;

  constructor(public payload: Quote) {
  }
}

export class QuoteFailAction implements Action {
  readonly type = QUOTE_FAIL;

  constructor(public payload: string) {
  }
}


export type Actions
  = QuoteAction
  | QuoteSuccessAction
  | QuoteFailAction;
