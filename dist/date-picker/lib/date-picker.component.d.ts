import { OnInit } from '@angular/core';
import { DatePickerService } from './date-picker.service';
import { init } from './date-picker.model';
import { LocaleService, I18nService, VIPService } from '@vmw/ngx-vip';
import * as i0 from "@angular/core";
export declare class DatePickerComponent implements OnInit {
    private datePickerService;
    private localeService;
    private i18nService;
    private VIPService;
    defaultDate: any;
    totalCurrentMonthDaysList: any;
    currentYear: number;
    currentMonth: number;
    currentDate: number;
    yearStrList: any;
    selectedDate: any;
    isShowMonthList: boolean;
    isShowYearList: boolean;
    isShowDateList: boolean;
    isShowCalendar: boolean;
    currentLanguage: any;
    private onDateChange;
    displayStrings: init;
    selectedFormat: string;
    calendarWidth: any;
    startDay: number | string;
    constructor(datePickerService: DatePickerService, localeService: LocaleService, i18nService: I18nService, VIPService: VIPService);
    ngOnInit(): void;
    localeChangedHandel(): void;
    initCalendar(): void;
    preMonth(): void;
    nextMonth(): void;
    getDateDisplayFormat(): string;
    showCalendar(): void;
    hideCalendar(): void;
    clickDateHandel(date: string): void;
    showMonthList(): void;
    showYearList(): void;
    clickMonthHandel(month: number): void;
    clickYearHandel(year: number): void;
    gotoCurrentMonth(): void;
    preMonthList(): void;
    nextMonthList(): void;
    gotoCurrentYear(): void;
    closeDateBox(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatePickerComponent, "clarity-date-picker", never, { "displayStrings": "displayStrings"; "calendarWidth": "calendarWidth"; "startDay": "startDay"; }, { "onDateChange": "onDateChange"; }, never, never>;
}
