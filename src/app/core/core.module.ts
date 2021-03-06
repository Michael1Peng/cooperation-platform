import {NgModule, SkipSelf, Optional} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MatIconRegistry} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DomSanitizer} from '@angular/platform-browser';
import {HeaderComponent} from './header.component';
import {FooterComponent} from './footer.component';
import {SidebarComponent} from './sidebar.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {loadSvgResources} from '../utils/svg.util';

import 'hammerjs';
import {AppStoreModule} from '../reducers';
import {APPEffectsModule} from '../effects';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    AppStoreModule,
    APPEffectsModule
  ],
  providers: [
    {
      provide: 'RESOURCE', useValue: {
        url: 'http://localhost:3000'
      }
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule,
              ir: MatIconRegistry,
              ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('Module has existed, can not load it here again!');
    }
    loadSvgResources(ir, ds);
  }
}
