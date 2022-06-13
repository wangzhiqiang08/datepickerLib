import { VIPService } from '@vmw/ngx-vip';
import * as i0 from "@angular/core";
import * as i1 from "./date-picker.component";
import * as i2 from "./listener-picker.directive";
import * as i3 from "@angular/common";
import * as i4 from "@vmw/ngx-vip";
export declare class DatePickerModule {
    private vipService;
    constructor(vipService: VIPService);
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DatePickerModule, [typeof i1.DatePickerComponent, typeof i2.ClickOutsideDirective], [typeof i3.CommonModule, typeof i4.VIPModule], [typeof i1.DatePickerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DatePickerModule>;
}
