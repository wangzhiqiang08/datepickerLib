import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Directive, Output, HostListener, Component, NgModule } from '@angular/core';
import * as i2 from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';

class DatePickerService {
    constructor() { }
    calculate(year, month, day) {
        let date = year + '/' + month + '/' + '1';
        let whichDay = new Date(date).getDay();
        let message = {
            year: year,
            month: month,
            currentMonthLen: new Date(year, month, 0).getDate(),
            previousMonthLen: new Date(year, (month - 1), 0).getDate(),
            nextMonthLen: new Date(year, (month + 1), 0).getDate(),
            whichDay: whichDay,
            day: day
        };
        return message;
    }
    getTotalMonthList(year, month, day) {
        let dayLists = [];
        let calcResult = this.calculate(year, month, day);
        let startWeekDay = calcResult.whichDay;
        let currentMonthList = this.getMonthList(calcResult.currentMonthLen);
        let previousMonthList = this.getMonthList(calcResult.previousMonthLen);
        let nextMonthList = this.getMonthList(calcResult.nextMonthLen);
        if (startWeekDay == 0) {
            dayLists = [...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length)];
        }
        else {
            let previousMonthSlice = previousMonthList.slice(-startWeekDay, previousMonthList.length);
            dayLists = [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
        }
        return dayLists;
    }
    getMonthList(monthLength) {
        let list = [];
        for (let i = 1; i <= monthLength; i++) {
            list.push(i);
        }
        return list;
    }
    setEveryDateStatus(year, month, day, selectedDate) {
        let totalDates = this.getTotalMonthList(year, month, day);
        let now = new Date();
        let currentDate = now.getDate();
        let currentMonth = now.getMonth() + 1;
        let currentYear = now.getFullYear();
        let selected = selectedDate && selectedDate.split("/");
        if (!selectedDate) {
            totalDates = totalDates.map((date) => {
                let isToday = (date === currentDate) && (month === currentMonth) && (year === currentYear);
                return { date: date, isToday: isToday, isSelected: false, isCurrentMonth: null };
            });
            totalDates = this.filterAndSetCurrentMonthDate(totalDates);
        }
        else {
            totalDates = totalDates.map((date, index) => {
                let isToday = (date === currentDate) && (month === currentMonth) && (year === currentYear);
                let isSelected = (date === Number(selected[0])) && (month === Number(selected[1])) && (year === Number(selected[2])) && this.isCurrentMontDate(totalDates, index + 1);
                return { date: date, isToday: isToday, isSelected: isSelected, isCurrentMonth: null };
            });
            totalDates = this.filterAndSetCurrentMonthDate(totalDates);
        }
        return totalDates;
    }
    filterAndSetCurrentMonthDate(totalDates) {
        let currentMonthStart, currentMonthEnd, includes = [];
        totalDates.forEach((el, i) => (el.date === 1 || el.date === "1") && includes.push(i));
        if (includes.length > 0) {
            currentMonthStart = includes[0];
            currentMonthEnd = includes[1];
            totalDates.map((date, index) => {
                if (index >= currentMonthStart && index < currentMonthEnd) {
                    date.isCurrentMonth = true;
                }
                else {
                    date.isCurrentMonth = false;
                }
            });
            return totalDates;
        }
        else {
            return totalDates;
        }
    }
    isCurrentMontDate(totalDates, index) {
        let currentMonthStart, currentMonthEnd, includes = [];
        totalDates.forEach((el, i) => (el === 1 || el === "1") && includes.push(i));
        currentMonthStart = includes[0];
        currentMonthEnd = includes[1];
        return index >= currentMonthStart && index < currentMonthEnd;
    }
    getYearList(currentYear) {
        let year = currentYear;
        let endNumber = year.toString().trim().slice(-1);
        let list = [];
        if (endNumber == '0') {
            for (let i = currentYear; i < (currentYear + 10); i++) {
                list.push(Number(i));
            }
        }
        else {
            for (let i = 0; i < 10; i++) {
                currentYear--;
                if (currentYear % 10 == 0) {
                    break;
                }
            }
            for (let i = currentYear; i < (currentYear + 10); i++) {
                list.push(Number(i));
            }
        }
        return list;
    }
}
DatePickerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DatePickerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

const initDate = {
    weekDayFormat: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    monthStrList: [
        { short: 'Jan', long: 'January' },
        { short: 'Feb', long: 'February' },
        { short: 'Mar', long: 'March' },
        { short: 'Apr', long: 'April' },
        { short: 'May', long: 'May' },
        { short: 'Jun', long: 'June' },
        { short: 'Jul', long: 'July' },
        { short: 'Aug', long: 'August' },
        { short: 'Sep', long: 'September' },
        { short: 'Oct', long: 'October' },
        { short: 'Nov', long: 'November' },
        { short: 'Dec', long: 'December' }
    ]
};

class ClickOutsideDirective {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new EventEmitter();
    }
    onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(null);
        }
    }
}
ClickOutsideDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: ClickOutsideDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ClickOutsideDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.10", type: ClickOutsideDirective, selector: "[clickOutside]", outputs: { clickOutside: "clickOutside" }, host: { listeners: { "document:click": "onClick($event.target)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: ClickOutsideDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[clickOutside]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { clickOutside: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['document:click', ['$event.target']]
            }] } });

class DatePickerComponent {
    constructor(datePickerService, domSanitizer) {
        this.datePickerService = datePickerService;
        this.domSanitizer = domSanitizer;
        this.isShowMonthList = false;
        this.isShowYearList = false;
        this.isShowDateList = true;
        this.isShowCalendar = false;
        this.onDateChange = new EventEmitter();
    }
    ngOnInit() {
        this.initCalendar(initDate);
        this.selectedDate = null;
        this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
        this.monthStrList = initDate.monthStrList;
        this.yearStrList = this.datePickerService.getYearList(this.currentYear);
    }
    initCalendar(options) {
        this.weekDayFormat = options.weekDayFormat;
        let nowDate = new Date();
        this.currentYear = nowDate.getFullYear();
        this.currentMonth = nowDate.getMonth() + 1;
        this.currentDate = nowDate.getDate();
    }
    preMonth() {
        if (this.currentMonth > 1) {
            this.currentMonth--;
            this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
        }
        else if (this.currentMonth == 1) {
            this.currentYear--;
            this.currentMonth = 12;
            this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
        }
    }
    nextMonth() {
        if (this.currentMonth < 12) {
            this.currentMonth++;
            this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
        }
        else if (this.currentMonth == 12) {
            this.currentYear++;
            this.currentMonth = 1;
            this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
        }
    }
    getDateDidplayFormat() {
        if (this.selectedDate) {
            let selected = this.selectedDate && this.selectedDate.split("/");
            let str = `${selected[0]}\/${selected[1]}\/${selected[2]}`;
            return str;
        }
        return "";
    }
    showCalendar() {
        this.isShowCalendar = true;
    }
    hideCalendar() {
        this.isShowCalendar = false;
    }
    clickDateHandel(date) {
        let d = (date && Number(date)) || (this.currentDate && Number(this.currentDate));
        let selected = `${d}\/${this.currentMonth}\/${this.currentYear}`;
        this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, selected);
        this.selectedDate = selected;
        this.isShowCalendar = false;
        this.onDateChange.emit(selected);
    }
    showMonthList() {
        this.isShowMonthList = true;
        this.isShowDateList = false;
    }
    showYearList() {
        this.isShowYearList = true;
        this.isShowDateList = false;
    }
    clickMonthHandel(month) {
        this.currentMonth = month || this.currentMonth;
        this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
        this.isShowMonthList = !this.isShowMonthList;
        this.isShowDateList = !this.isShowDateList;
    }
    clickYearHandel(year) {
        this.currentYear = year || this.currentYear;
        this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
        this.isShowYearList = !this.isShowYearList;
        this.isShowDateList = !this.isShowDateList;
    }
    gotoCurrentMonth() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        this.currentYear = year;
        this.currentMonth = month;
        this.currentDate = date;
        if (this.selectedDate) {
            if (Number(this.selectedDate.split('/')[1]) == this.currentMonth) {
                return;
            }
            else {
                this.selectedDate = null;
                this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
            }
        }
    }
    preMonthList() {
        let startYear = this.yearStrList[0] - 1;
        this.yearStrList = this.datePickerService.getYearList(startYear);
    }
    nextMonthList() {
        let endYear = this.yearStrList[9] + 1;
        this.yearStrList = this.datePickerService.getYearList(endYear);
    }
    gotoCurrentYear() {
        let currentYear = new Date().getFullYear();
        this.yearStrList = this.datePickerService.getYearList(currentYear);
        this.currentYear = currentYear;
    }
    closeDateBox() {
        this.isShowCalendar = false;
    }
}
DatePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerComponent, deps: [{ token: DatePickerService }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
DatePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.10", type: DatePickerComponent, selector: "clarity-date-picker", outputs: { onDateChange: "onDateChange" }, ngImport: i0, template: "<div id=\"calendar\" (clickOutside)=\"closeDateBox()\">\n  <div style=\"display:flex; justify-content: flex-end; width: 200px; height: 24px;\">\n    <div style=\"display:flex; flex-direction: column;\">\n      <input type=\"text\" id='ipt' value=\"{{getDateDidplayFormat()}}\" readonly>\n      <div  class=\"bottomLine\"></div>\n    </div>\n    \n    <svg (click)=\"showCalendar()\" class=\"icon\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n      <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"20\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"20\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect x=\"20\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n      <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n    </svg>\n  </div>\n  \n  <div class=\"container-box\" [style.display]=\"isShowCalendar ? 'block' : 'none' \">\n    <div [style.display]=\"isShowDateList ? 'block' : 'none'\">\n      <div class=\"month-year-change\">\n        <div class=\"month-year-display\">\n          <span (click)=\"showMonthList()\">{{monthStrList[currentMonth-1].short}}</span>\n          <span (click)=\"showYearList()\">{{currentYear}}</span>\n        </div>\n        <div class=\"change-button\">\n          <span (click)=\"preMonth()\">\n            <svg style=\"transform: rotate(-90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n          <span>\n            <svg (click)=\"gotoCurrentMonth()\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M16.17,25.86,10.81,20.5a1,1,0,0,1,1.41-1.41L16.17,23l8.64-8.64a1,1,0,0,1,1.41,1.41Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n              <rect x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n            </svg>\n          </span>\n          <span (click)=\"nextMonth()\">\n            <svg style=\"transform: rotate(90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n        </div>\n        \n      </div>\n      <div class=\"day-list\" id='myTable'>\n        <div class=\"weekDayList\">\n          <span *ngFor=\"let weekDay of weekDayFormat\">{{weekDay}}</span>\n        </div>\n        <div class=\"dayBox\">\n          <div class=\"row-list\">\n            <button (click)=\"clickDateHandel(item.date)\"  *ngFor=\"let item of totalCurrentMonthDaysList\">\n              <span [style.display]=\"!selectedDate ? 'block' : 'none'\" [ngClass]=\"{'notCurrentMonthDateStyle':!item.isCurrentMonth, 'currentDateBgcolor': item.isToday && item.isCurrentMonth && !selectedDate, 'currentDateFontWeight': item.isToday && item.isCurrentMonth}\">\n                {{item.date}}\n              </span>\n              <span [style.display]=\"selectedDate ? 'block' : 'none'\" [ngClass]=\"{ 'selectedDateBgColor': item.isSelected, 'notCurrentMonthDateStyle':!item.isCurrentMonth, 'currentDateBgcolor': item.isToday && item.isCurrentMonth && !item.isSelected && !selectedDate, 'currentDateFontWeight': item.isToday && item.isCurrentMonth}\">\n                {{item.date}}\n              </span>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  \n    <div class=\"month-select-box\" [style.display]=\"isShowMonthList ? 'block' : 'none'\">\n      <button (click)=\"clickMonthHandel(index+1)\" [ngClass]=\"{'monthSelected': (index+1) == currentMonth}\" *ngFor=\"let month of monthStrList; let index = index\">{{month.long}}</button>\n    </div>\n  \n    <div class=\"year-select-box\" [style.display]=\"isShowYearList ? 'block' : 'none'\">\n      <div style=\"display:flex; justify-content: center;width: 100%;\">\n        <div class=\"change-button\">\n          <span (click)=\"preMonthList()\">\n            <svg style=\"transform: rotate(-90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n          <span>\n            <svg (click)=\"gotoCurrentYear()\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M16.17,25.86,10.81,20.5a1,1,0,0,1,1.41-1.41L16.17,23l8.64-8.64a1,1,0,0,1,1.41,1.41Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n              <rect x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n            </svg>\n          </span>\n          <span (click)=\"nextMonthList()\">\n            <svg style=\"transform: rotate(90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n        </div>\n      </div>\n      <div style=\"height: 92%; display: flex; flex-direction: column; flex-wrap: wrap;\">\n        <button (click)=\"clickYearHandel(year)\" [ngClass]=\"{'yearSelected': year == currentYear}\" *ngFor=\"let year of yearStrList; let index = index\">{{year}}</button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: ["#calendar{display:inline-block;position:relative}#calendar #ipt{width:200px;border:0;height:24px;outline:none}#calendar .bottomLine{width:200px;height:1px;background-color:#6d7a80}#calendar .container-box{width:280px;height:315px;background-color:#fff;border:1px solid #cccccc;border-radius:5px;padding:10px;display:block;text-align:center;font-family:Metropolis,Avenir Next,Helvetica Neue,Arial,sans-serif;position:absolute;z-index:2000;top:30px;left:5px}#calendar .container-box .day-list{width:280px;font-size:14px;color:#676767}#calendar .container-box .day-list .weekDayList>span{display:inline-block;width:36px;height:36px;text-align:center;line-height:36px;font-weight:600}#calendar .container-box .day-list .dayBox .row-list{display:flex;justify-content:space-between;flex-wrap:wrap}#calendar .container-box .day-list .dayBox .row-list button{width:36px;height:36px;font-size:14px;border:none;background-color:#fff;color:#696969;padding:0}#calendar .container-box .day-list .dayBox .row-list button span{display:inline-block;width:36px;height:36px;border-radius:3px;text-align:center;line-height:36px}#calendar .container-box .day-list .dayBox .row-list button:hover{background:#e8e8e8;cursor:pointer;border-radius:3px}#calendar .container-box .day-list .weekDayList{display:flex;justify-content:space-between}#calendar .container-box .month-year-change{font-size:18px;color:#0072a3;height:40px;display:flex;justify-content:space-between;padding:0 10px 10px;align-items:center}#calendar .container-box .month-year-change .month-year-display span{display:inline-block;cursor:pointer;padding:8px 7px}#calendar .container-box .month-year-change .month-year-display span:hover{background-color:#e8e8e8;border-radius:3px}#calendar .container-box .month-year-change .month-year-display span:first-child{text-align:center;margin-right:1px}#calendar .container-box .month-year-change .change-button{width:90px;display:flex;justify-content:space-between;align-items:center}#calendar .container-box .month-year-change .change-button svg{width:20px;height:20px;color:#0072a3}#calendar .container-box .month-year-change .change-button>span:hover{cursor:pointer}#calendar .container-box .month-select-box{display:flex;flex-direction:column;flex-wrap:wrap;width:100%;height:100%}#calendar .container-box .month-select-box button{width:50%;height:16.6%;font-size:18px;color:#666;border:none;background:none}#calendar .container-box .month-select-box button.monthSelected{background-color:#dae3e8;color:#1b1c1d;border-radius:3px}#calendar .container-box .month-select-box button:hover{background:#e8e8e8;border-radius:3px;color:#000}#calendar .container-box .year-select-box{display:flex;flex-direction:column;flex-wrap:wrap;width:100%;height:100%}#calendar .container-box .year-select-box .change-button{width:90px;display:flex;justify-content:space-between;align-items:center}#calendar .container-box .year-select-box .change-button svg{width:20px;height:20px;color:#0072a3}#calendar .container-box .year-select-box .change-button>span:hover{cursor:pointer}#calendar .container-box .year-select-box div button{width:50%;height:20%;font-size:18px;color:#666;border:none;background:none}#calendar .container-box .year-select-box div button.yearSelected{background-color:#dae3e8;color:#1b1c1d;border-radius:3px}#calendar .container-box .year-select-box div button:hover{background:#e8e8e8;border-radius:3px;color:#000}.notCurrentMonthDateStyle{color:#c2c2c2}.currentDateBgcolor{background-color:#e8e8e8}.currentDateFontWeight{font-weight:600;color:#1b1c1d}.selectedDateBgColor{background-color:#dae3e8;color:#1b1c1d}.icon{width:20px;height:20px;color:#0072a3;margin-left:-30px;cursor:pointer}\n"], directives: [{ type: ClickOutsideDirective, selector: "[clickOutside]", outputs: ["clickOutside"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clarity-date-picker', template: "<div id=\"calendar\" (clickOutside)=\"closeDateBox()\">\n  <div style=\"display:flex; justify-content: flex-end; width: 200px; height: 24px;\">\n    <div style=\"display:flex; flex-direction: column;\">\n      <input type=\"text\" id='ipt' value=\"{{getDateDidplayFormat()}}\" readonly>\n      <div  class=\"bottomLine\"></div>\n    </div>\n    \n    <svg (click)=\"showCalendar()\" class=\"icon\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n      <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"20\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"20\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect x=\"20\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n      <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n    </svg>\n  </div>\n  \n  <div class=\"container-box\" [style.display]=\"isShowCalendar ? 'block' : 'none' \">\n    <div [style.display]=\"isShowDateList ? 'block' : 'none'\">\n      <div class=\"month-year-change\">\n        <div class=\"month-year-display\">\n          <span (click)=\"showMonthList()\">{{monthStrList[currentMonth-1].short}}</span>\n          <span (click)=\"showYearList()\">{{currentYear}}</span>\n        </div>\n        <div class=\"change-button\">\n          <span (click)=\"preMonth()\">\n            <svg style=\"transform: rotate(-90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n          <span>\n            <svg (click)=\"gotoCurrentMonth()\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M16.17,25.86,10.81,20.5a1,1,0,0,1,1.41-1.41L16.17,23l8.64-8.64a1,1,0,0,1,1.41,1.41Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n              <rect x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n            </svg>\n          </span>\n          <span (click)=\"nextMonth()\">\n            <svg style=\"transform: rotate(90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n        </div>\n        \n      </div>\n      <div class=\"day-list\" id='myTable'>\n        <div class=\"weekDayList\">\n          <span *ngFor=\"let weekDay of weekDayFormat\">{{weekDay}}</span>\n        </div>\n        <div class=\"dayBox\">\n          <div class=\"row-list\">\n            <button (click)=\"clickDateHandel(item.date)\"  *ngFor=\"let item of totalCurrentMonthDaysList\">\n              <span [style.display]=\"!selectedDate ? 'block' : 'none'\" [ngClass]=\"{'notCurrentMonthDateStyle':!item.isCurrentMonth, 'currentDateBgcolor': item.isToday && item.isCurrentMonth && !selectedDate, 'currentDateFontWeight': item.isToday && item.isCurrentMonth}\">\n                {{item.date}}\n              </span>\n              <span [style.display]=\"selectedDate ? 'block' : 'none'\" [ngClass]=\"{ 'selectedDateBgColor': item.isSelected, 'notCurrentMonthDateStyle':!item.isCurrentMonth, 'currentDateBgcolor': item.isToday && item.isCurrentMonth && !item.isSelected && !selectedDate, 'currentDateFontWeight': item.isToday && item.isCurrentMonth}\">\n                {{item.date}}\n              </span>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  \n    <div class=\"month-select-box\" [style.display]=\"isShowMonthList ? 'block' : 'none'\">\n      <button (click)=\"clickMonthHandel(index+1)\" [ngClass]=\"{'monthSelected': (index+1) == currentMonth}\" *ngFor=\"let month of monthStrList; let index = index\">{{month.long}}</button>\n    </div>\n  \n    <div class=\"year-select-box\" [style.display]=\"isShowYearList ? 'block' : 'none'\">\n      <div style=\"display:flex; justify-content: center;width: 100%;\">\n        <div class=\"change-button\">\n          <span (click)=\"preMonthList()\">\n            <svg style=\"transform: rotate(-90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n          <span>\n            <svg (click)=\"gotoCurrentYear()\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M16.17,25.86,10.81,20.5a1,1,0,0,1,1.41-1.41L16.17,23l8.64-8.64a1,1,0,0,1,1.41,1.41Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n              <rect x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n            </svg>\n          </span>\n          <span (click)=\"nextMonthList()\">\n            <svg style=\"transform: rotate(90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n        </div>\n      </div>\n      <div style=\"height: 92%; display: flex; flex-direction: column; flex-wrap: wrap;\">\n        <button (click)=\"clickYearHandel(year)\" [ngClass]=\"{'yearSelected': year == currentYear}\" *ngFor=\"let year of yearStrList; let index = index\">{{year}}</button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: ["#calendar{display:inline-block;position:relative}#calendar #ipt{width:200px;border:0;height:24px;outline:none}#calendar .bottomLine{width:200px;height:1px;background-color:#6d7a80}#calendar .container-box{width:280px;height:315px;background-color:#fff;border:1px solid #cccccc;border-radius:5px;padding:10px;display:block;text-align:center;font-family:Metropolis,Avenir Next,Helvetica Neue,Arial,sans-serif;position:absolute;z-index:2000;top:30px;left:5px}#calendar .container-box .day-list{width:280px;font-size:14px;color:#676767}#calendar .container-box .day-list .weekDayList>span{display:inline-block;width:36px;height:36px;text-align:center;line-height:36px;font-weight:600}#calendar .container-box .day-list .dayBox .row-list{display:flex;justify-content:space-between;flex-wrap:wrap}#calendar .container-box .day-list .dayBox .row-list button{width:36px;height:36px;font-size:14px;border:none;background-color:#fff;color:#696969;padding:0}#calendar .container-box .day-list .dayBox .row-list button span{display:inline-block;width:36px;height:36px;border-radius:3px;text-align:center;line-height:36px}#calendar .container-box .day-list .dayBox .row-list button:hover{background:#e8e8e8;cursor:pointer;border-radius:3px}#calendar .container-box .day-list .weekDayList{display:flex;justify-content:space-between}#calendar .container-box .month-year-change{font-size:18px;color:#0072a3;height:40px;display:flex;justify-content:space-between;padding:0 10px 10px;align-items:center}#calendar .container-box .month-year-change .month-year-display span{display:inline-block;cursor:pointer;padding:8px 7px}#calendar .container-box .month-year-change .month-year-display span:hover{background-color:#e8e8e8;border-radius:3px}#calendar .container-box .month-year-change .month-year-display span:first-child{text-align:center;margin-right:1px}#calendar .container-box .month-year-change .change-button{width:90px;display:flex;justify-content:space-between;align-items:center}#calendar .container-box .month-year-change .change-button svg{width:20px;height:20px;color:#0072a3}#calendar .container-box .month-year-change .change-button>span:hover{cursor:pointer}#calendar .container-box .month-select-box{display:flex;flex-direction:column;flex-wrap:wrap;width:100%;height:100%}#calendar .container-box .month-select-box button{width:50%;height:16.6%;font-size:18px;color:#666;border:none;background:none}#calendar .container-box .month-select-box button.monthSelected{background-color:#dae3e8;color:#1b1c1d;border-radius:3px}#calendar .container-box .month-select-box button:hover{background:#e8e8e8;border-radius:3px;color:#000}#calendar .container-box .year-select-box{display:flex;flex-direction:column;flex-wrap:wrap;width:100%;height:100%}#calendar .container-box .year-select-box .change-button{width:90px;display:flex;justify-content:space-between;align-items:center}#calendar .container-box .year-select-box .change-button svg{width:20px;height:20px;color:#0072a3}#calendar .container-box .year-select-box .change-button>span:hover{cursor:pointer}#calendar .container-box .year-select-box div button{width:50%;height:20%;font-size:18px;color:#666;border:none;background:none}#calendar .container-box .year-select-box div button.yearSelected{background-color:#dae3e8;color:#1b1c1d;border-radius:3px}#calendar .container-box .year-select-box div button:hover{background:#e8e8e8;border-radius:3px;color:#000}.notCurrentMonthDateStyle{color:#c2c2c2}.currentDateBgcolor{background-color:#e8e8e8}.currentDateFontWeight{font-weight:600;color:#1b1c1d}.selectedDateBgColor{background-color:#dae3e8;color:#1b1c1d}.icon{width:20px;height:20px;color:#0072a3;margin-left:-30px;cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: DatePickerService }, { type: i2.DomSanitizer }]; }, propDecorators: { onDateChange: [{
                type: Output
            }] } });

class DatePickerModule {
}
DatePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DatePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerModule, declarations: [DatePickerComponent,
        ClickOutsideDirective], imports: [BrowserModule,
        CommonModule], exports: [DatePickerComponent] });
DatePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerModule, imports: [[
            BrowserModule,
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerModule, decorators: [{
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

/*
 * Public API Surface of date-picker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DatePickerComponent, DatePickerModule, DatePickerService };
//# sourceMappingURL=clarity-date-picker.mjs.map
