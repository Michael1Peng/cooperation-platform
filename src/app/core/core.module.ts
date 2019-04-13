import {NgModule, SkipSelf, Optional} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MatIconRegistry} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DomSanitizer} from '@angular/platform-browser';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SharedModule} from '../shared/shared.module';
import {loadSvgResources} from '../utils/svg.util';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
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
  }
}
