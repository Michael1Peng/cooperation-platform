import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuoteService} from './quote.service';
import {ProjectService} from './project.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [QuoteService, ProjectService]
})
export class ServiceModule { }
