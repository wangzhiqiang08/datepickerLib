import * as i0 from "@angular/core";
export declare class DatePickerService {
    constructor();
    calculate(year: number, month: number, day: number): any;
    getTotalMonthList(year: number, month: number, day: number, startDay: string | number): Array<any>;
    getMonthList(monthLength: number): Array<any>;
    setEveryDateStatus(year: number, month: number, day: number, selectedDate: string | null, startWithSundayOrMonday: string | number): Array<number>;
    filterAndSetCurrentMonthDate(totalDates: Array<number>): number[];
    isCurrentMonthDate(totalDates: Array<number>, index: number): boolean;
    getYearList(currentYear: number): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DatePickerService>;
}
