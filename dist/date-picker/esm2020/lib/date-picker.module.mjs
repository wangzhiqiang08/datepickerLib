import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerComponent } from './date-picker.component';
import { ClickOutsideDirective } from './listener-picker.directive';
import * as i0 from "@angular/core";
export class DatePickerModule {
}
DatePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.9", ngImport: i0, type: DatePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DatePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.9", ngImport: i0, type: DatePickerModule, declarations: [DatePickerComponent,
        ClickOutsideDirective], imports: [BrowserModule,
        CommonModule], exports: [DatePickerComponent] });
DatePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.9", ngImport: i0, type: DatePickerModule, imports: [[
            BrowserModule,
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.9", ngImport: i0, type: DatePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DatePickerComponent,
                        ClickOutsideDirective
                    ],
                    imports: [
                        BrowserModule,
                        CommonModule
                    ],
                    exports: [
                        DatePickerComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZGF0ZS1waWNrZXIvc3JjL2xpYi9kYXRlLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQWlCcEUsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCLGlCQVh6QixtQkFBbUI7UUFDbkIscUJBQXFCLGFBR3JCLGFBQWE7UUFDYixZQUFZLGFBR1osbUJBQW1COzhHQUdWLGdCQUFnQixZQVJsQjtZQUNQLGFBQWE7WUFDYixZQUFZO1NBQ2I7MkZBS1UsZ0JBQWdCO2tCQWI1QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixtQkFBbUI7d0JBQ25CLHFCQUFxQjtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGFBQWE7d0JBQ2IsWUFBWTtxQkFDYjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3FCQUNwQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRGF0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENsaWNrT3V0c2lkZURpcmVjdGl2ZSB9IGZyb20gJy4vbGlzdGVuZXItcGlja2VyLmRpcmVjdGl2ZSc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgIENsaWNrT3V0c2lkZURpcmVjdGl2ZVxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERhdGVQaWNrZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlUGlja2VyTW9kdWxlIHsgfVxuIl19