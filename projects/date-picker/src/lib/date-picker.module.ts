import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerComponent } from './date-picker.component';
import { ClickOutsideDirective } from './listener-picker.directive';
import { VIPModule, VIPService, VIPLoader, I18nLoader, LocaleService } from '@vmw/ngx-vip';
import { I18nConfig } from './i18n.config';



@NgModule({
  declarations: [
    DatePickerComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    VIPModule.forRoot({
      coreLoader: {
          provide: I18nLoader,
          useClass: VIPLoader
      }
  }),
  ],
  providers:[
    VIPService,
    LocaleService
  ],
  exports: [
    DatePickerComponent
  ]
})
export class DatePickerModule {
  constructor(private vipService: VIPService) {
    // register feature module configuration
    vipService.registerComponent(I18nConfig);
  }
 }
