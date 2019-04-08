import {NgModule, SkipSelf, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Module has existed, can not load it here again!');
    }
  }
}
