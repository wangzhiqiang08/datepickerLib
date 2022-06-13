import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerComponent } from './date-picker.component';
import { ClickOutsideDirective } from './listener-picker.directive';
import { VIPModule, VIPService, VIPLoader, I18nLoader } from '@vmw/ngx-vip';
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
        VIPService
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
                        VIPService
                    ],
                    exports: [
                        DatePickerComponent
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.VIPService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZGF0ZS1waWNrZXIvc3JjL2xpYi9kYXRlLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUF5QjNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN4Qyx3Q0FBd0M7UUFDeEMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7OzhHQUpVLGdCQUFnQjsrR0FBaEIsZ0JBQWdCLGlCQW5CekIsbUJBQW1CO1FBQ25CLHFCQUFxQixhQUdyQixZQUFZLDJCQVlaLG1CQUFtQjsrR0FHVixnQkFBZ0IsYUFQakI7UUFDUixVQUFVO0tBQ1gsWUFYUTtZQUNQLFlBQVk7WUFDWixTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUNoQixVQUFVLEVBQUU7b0JBQ1IsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFFBQVEsRUFBRSxTQUFTO2lCQUN0QjthQUNKLENBQUM7U0FDRDs0RkFRVSxnQkFBZ0I7a0JBckI1QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixtQkFBbUI7d0JBQ25CLHFCQUFxQjtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osU0FBUyxDQUFDLE9BQU8sQ0FBQzs0QkFDaEIsVUFBVSxFQUFFO2dDQUNSLE9BQU8sRUFBRSxVQUFVO2dDQUNuQixRQUFRLEVBQUUsU0FBUzs2QkFDdEI7eUJBQ0osQ0FBQztxQkFDRDtvQkFDRCxTQUFTLEVBQUM7d0JBQ1IsVUFBVTtxQkFDWDtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3FCQUNwQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENsaWNrT3V0c2lkZURpcmVjdGl2ZSB9IGZyb20gJy4vbGlzdGVuZXItcGlja2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWSVBNb2R1bGUsIFZJUFNlcnZpY2UsIFZJUExvYWRlciwgSTE4bkxvYWRlciB9IGZyb20gJ0B2bXcvbmd4LXZpcCc7XG5pbXBvcnQgeyBJMThuQ29uZmlnIH0gZnJvbSAnLi9pMThuLmNvbmZpZyc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgIENsaWNrT3V0c2lkZURpcmVjdGl2ZVxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFZJUE1vZHVsZS5mb3JSb290KHtcbiAgICAgIGNvcmVMb2FkZXI6IHtcbiAgICAgICAgICBwcm92aWRlOiBJMThuTG9hZGVyLFxuICAgICAgICAgIHVzZUNsYXNzOiBWSVBMb2FkZXJcbiAgICAgIH1cbiAgfSksXG4gIF0sXG4gIHByb3ZpZGVyczpbXG4gICAgVklQU2VydmljZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGF0ZVBpY2tlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpcFNlcnZpY2U6IFZJUFNlcnZpY2UpIHtcbiAgICAvLyByZWdpc3RlciBmZWF0dXJlIG1vZHVsZSBjb25maWd1cmF0aW9uXG4gICAgdmlwU2VydmljZS5yZWdpc3RlckNvbXBvbmVudChJMThuQ29uZmlnKTtcbiAgfVxuIH1cbiJdfQ==