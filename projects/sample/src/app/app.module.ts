import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePickerModule } from 'date-picker';
import { VIPModule, VIPService, LocaleService, PatternCategories, getBrowserCultureLang, VIPLoader, I18nLoader } from '@vmw/ngx-vip';
import { ENGLISH } from './source/app.l10n';
import { TestComponent } from './test/test.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


export function initVIPConfig(service: VIPService, localeService: LocaleService) {
  // Get the browser's language by replacing 'es' with getBrowserCultureLang()
  localeService.init('es');
  return () => service.initData({
     productID: 'SampleApp',
     component: 'datePicker',
     version: '1.0.0',
     i18nScope: [
        PatternCategories.DATE,
        PatternCategories.NUMBER,
        PatternCategories.CURRENCIES
     ],
     host: 'https://g11n-vip-dev-1.eng.vmware.com:8090/',
     isPseudo: false,
     collectSource: false,
     sourceBundle: ENGLISH,
     timeout: 5000
  });
}

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DatePickerModule,
    HttpClientModule,
    VIPModule.forRoot({
      coreLoader: {
          provide: I18nLoader,
          useClass: VIPLoader
      }
  }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initVIPConfig,
      deps: [
        VIPService,
        LocaleService
      ],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
