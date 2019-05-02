import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuoteService} from './quote.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [QuoteService]
})
export class ServiceModule { }
