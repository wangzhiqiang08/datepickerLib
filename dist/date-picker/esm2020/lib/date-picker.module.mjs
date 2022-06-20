import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerComponent } from './date-picker.component';
import { ClickOutsideDirective } from './listener-picker.directive';
import { VIPModule, VIPService, VIPLoader, I18nLoader, LocaleService } from '@vmw/ngx-vip';
import { I18nConfig } from './i18n.config';
import * as i0 from "@angular/core";
import * as i1 from "@vmw/ngx-vip";
export class DatePickerModule {
    constructor(vipService) {
        this.vipService = vipService;
        // register feature module configuration
        vipService.registerComponent(I18nConfig);
    }
}
DatePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerModule, deps: [{ token: i1.VIPService }], target: i0.ɵɵFactoryTarget.NgModule });
DatePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerModule, declarations: [DatePickerComponent,
        ClickOutsideDirective], imports: [CommonModule, i1.VIPModule], exports: [DatePickerComponent] });
DatePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerModule, providers: [
        VIPService,
        LocaleService
    ], imports: [[
            CommonModule,
            VIPModule.forRoot({
                coreLoader: {
                    provide: I18nLoader,
                    useClass: VIPLoader
                }
            }),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerModule, decorators: [{
            type: NgModule,
            args: [{
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
                    providers: [
                        VIPService,
                        LocaleService
                    ],
                    exports: [
                        DatePickerComponent
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.VIPService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZGF0ZS1waWNrZXIvc3JjL2xpYi9kYXRlLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0YsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBMEIzQyxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDeEMsd0NBQXdDO1FBQ3hDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs4R0FKVSxnQkFBZ0I7K0dBQWhCLGdCQUFnQixpQkFwQnpCLG1CQUFtQjtRQUNuQixxQkFBcUIsYUFHckIsWUFBWSwyQkFhWixtQkFBbUI7K0dBR1YsZ0JBQWdCLGFBUmpCO1FBQ1IsVUFBVTtRQUNWLGFBQWE7S0FDZCxZQVpRO1lBQ1AsWUFBWTtZQUNaLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2hCLFVBQVUsRUFBRTtvQkFDUixPQUFPLEVBQUUsVUFBVTtvQkFDbkIsUUFBUSxFQUFFLFNBQVM7aUJBQ3RCO2FBQ0osQ0FBQztTQUNEOzRGQVNVLGdCQUFnQjtrQkF0QjVCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLG1CQUFtQjt3QkFDbkIscUJBQXFCO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixTQUFTLENBQUMsT0FBTyxDQUFDOzRCQUNoQixVQUFVLEVBQUU7Z0NBQ1IsT0FBTyxFQUFFLFVBQVU7Z0NBQ25CLFFBQVEsRUFBRSxTQUFTOzZCQUN0Qjt5QkFDSixDQUFDO3FCQUNEO29CQUNELFNBQVMsRUFBQzt3QkFDUixVQUFVO3dCQUNWLGFBQWE7cUJBQ2Q7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjtxQkFDcEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDbGlja091dHNpZGVEaXJlY3RpdmUgfSBmcm9tICcuL2xpc3RlbmVyLXBpY2tlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVklQTW9kdWxlLCBWSVBTZXJ2aWNlLCBWSVBMb2FkZXIsIEkxOG5Mb2FkZXIsIExvY2FsZVNlcnZpY2UgfSBmcm9tICdAdm13L25neC12aXAnO1xuaW1wb3J0IHsgSTE4bkNvbmZpZyB9IGZyb20gJy4vaTE4bi5jb25maWcnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGF0ZVBpY2tlckNvbXBvbmVudCxcbiAgICBDbGlja091dHNpZGVEaXJlY3RpdmVcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBWSVBNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBjb3JlTG9hZGVyOiB7XG4gICAgICAgICAgcHJvdmlkZTogSTE4bkxvYWRlcixcbiAgICAgICAgICB1c2VDbGFzczogVklQTG9hZGVyXG4gICAgICB9XG4gIH0pLFxuICBdLFxuICBwcm92aWRlcnM6W1xuICAgIFZJUFNlcnZpY2UsXG4gICAgTG9jYWxlU2VydmljZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGF0ZVBpY2tlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpcFNlcnZpY2U6IFZJUFNlcnZpY2UpIHtcbiAgICAvLyByZWdpc3RlciBmZWF0dXJlIG1vZHVsZSBjb25maWd1cmF0aW9uXG4gICAgdmlwU2VydmljZS5yZWdpc3RlckNvbXBvbmVudChJMThuQ29uZmlnKTtcbiAgfVxuIH1cbiJdfQ==