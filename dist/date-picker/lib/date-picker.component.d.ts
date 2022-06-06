import { OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePickerService } from './date-picker.service';
import { init } from './date-picker.model';
import * as i0 from "@angular/core";
export declare class DatePickerComponent implements OnInit {
    private datePickerService;
    private domSanitizer;
    weekDayFormat: any;
    defaultDate: any;
    totalCurrentMonthDaysList: any;
    currentYear: number;
    currentMonth: number;
    currentDate: number;
    monthStrList: any;
    yearStrList: any;
    selectedDate: any;
    isShowMonthList: boolean;
    isShowYearList: boolean;
    isShowDateList: boolean;
    isShowCalendar: boolean;
    private onDateChange;
    displayStrings: init;
    selectedFormat: string;
    currentLanguage: any;
    constructor(datePickerService: DatePickerService, domSanitizer: DomSanitizer);
    ngOnInit(): void;
    initCalendar(options: any): void;
    checkWeekDayFormat(weekList: string[]): void;
    preMonth(): void;
    nextMonth(): void;
    getDateDidplayFormat(): string;
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
    static ɵcmp: i0.ɵɵComponentDeclaration<DatePickerComponent, "clarity-date-picker", never, { "displayStrings": "displayStrings"; "currentLanguage": "currentLanguage"; }, { "onDateChange": "onDateChange"; }, never, never>;
}
