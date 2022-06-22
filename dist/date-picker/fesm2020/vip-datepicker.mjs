import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Directive, Output, HostListener, Component, Input, NgModule } from '@angular/core';
import * as i2 from '@vmw/ngx-vip';
import { PatternCategories, VIPService, LocaleService, VIPModule, I18nLoader, VIPLoader } from '@vmw/ngx-vip';
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
    getTotalMonthList(year, month, day, startWithSundayOrMonday) {
        let dayLists = [];
        let calcResult = this.calculate(year, month, day);
        let startWeekDay = calcResult.whichDay;
        let currentMonthList = this.getMonthList(calcResult.currentMonthLen);
        let previousMonthList = this.getMonthList(calcResult.previousMonthLen);
        let nextMonthList = this.getMonthList(calcResult.nextMonthLen);
        if (startWithSundayOrMonday == 1 || startWithSundayOrMonday == "1") {
            if (startWeekDay == 1) {
                dayLists = [...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length)];
            }
            else if (startWeekDay == 0) {
                let previousMonthSlice = previousMonthList.slice(-6, previousMonthList.length);
                dayLists = [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
            }
            else {
                let previousMonthSlice = previousMonthList.slice(-startWeekDay + 1, previousMonthList.length);
                dayLists = [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
            }
            return dayLists;
        }
        else if (startWithSundayOrMonday == 0 || startWithSundayOrMonday == "0") {
            if (startWeekDay == 0) {
                dayLists = [...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length)];
            }
            else {
                let previousMonthSlice = previousMonthList.slice(-startWeekDay, previousMonthList.length);
                dayLists = [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
            }
            return dayLists;
        }
        else {
            throw new SyntaxError("The key of 'startWithSundayOrMonday' 's value must be 0 or 1. ");
        }
    }
    getMonthList(monthLength) {
        let list = [];
        for (let i = 1; i <= monthLength; i++) {
            list.push(i);
        }
        return list;
    }
    setEveryDateStatus(year, month, day, selectedDate, startWithSundayOrMonday) {
        let totalDates = this.getTotalMonthList(year, month, day, startWithSundayOrMonday);
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
                let isSelected = (date === Number(selected[0])) && (month === Number(selected[1])) && (year === Number(selected[2])) && this.isCurrentMonthDate(totalDates, index + 1);
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
    isCurrentMonthDate(totalDates, index) {
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

class initDateType {
}
class init {
}
class week {
}
const initDate = {
    en_US: {
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
        ],
        selectedFormat: "mm/dd/yyyy"
    },
    zh_CN: {
        weekDayFormat: ['日', '一', '二', '三', '四', '五', '六'],
        monthStrList: [
            { short: '一月', long: '一月' },
            { short: '二月', long: '二月' },
            { short: '三月', long: '三月' },
            { short: '四月', long: '四月' },
            { short: '五月', long: '五月' },
            { short: '六月', long: '六月' },
            { short: '七月', long: '七月' },
            { short: '八月', long: '八月' },
            { short: '九月', long: '九月' },
            { short: '十月', long: '十月' },
            { short: '十一月', long: '十一月' },
            { short: '十二月', long: '十二月' }
        ],
        selectedFormat: "yyyy/mm/dd"
    },
    RUS: {
        weekDayFormat: ['BC', 'ПН', 'BT', 'CP', 'ЧТ', 'ПТ', 'СБ'],
        monthStrList: [
            { short: 'январь', long: 'январь' },
            { short: 'февраль', long: 'февраль' },
            { short: 'март', long: 'март' },
            { short: 'апрель', long: 'апрель' },
            { short: 'май', long: 'май' },
            { short: 'июнь', long: 'июнь' },
            { short: 'июль', long: 'июль' },
            { short: 'август', long: 'август' },
            { short: 'сентябрь', long: 'сентябрь' },
            { short: 'октябрь', long: 'октябрь' },
            { short: 'ноябрь', long: 'ноябрь' },
            { short: 'декабрь', long: 'декабрь' }
        ],
        selectedFormat: "dd/mm/yyyy"
    },
    fr: {
        weekDayFormat: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthStrList: [
            { short: 'jan.', long: 'janvier' },
            { short: 'fev.', long: 'février' },
            { short: 'mars.', long: 'mars' },
            { short: 'avr.', long: 'avril' },
            { short: 'mai.', long: 'mai' },
            { short: 'juin.', long: 'juin' },
            { short: 'juillet.', long: 'juillet' },
            { short: 'aout.', long: 'août' },
            { short: 'sept.', long: 'septembre' },
            { short: 'oct.', long: 'octobre' },
            { short: 'nov.', long: 'novembre' },
            { short: 'dec.', long: 'décembre' }
        ],
        selectedFormat: "dd/mm/yyyy"
    },
    SP: {
        weekDayFormat: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthStrList: [
            { short: 'en.', long: 'enero' },
            { short: 'febr.', long: 'febrero' },
            { short: 'mzo.', long: 'marzo' },
            { short: 'abr.', long: 'abril' },
            { short: 'my.', long: 'mayo' },
            { short: 'jun.', long: 'junio' },
            { short: 'jul.', long: 'julio' },
            { short: 'agto.', long: 'agosto' },
            { short: 'sept.', long: 'septiembre' },
            { short: 'oct.', long: 'octubre' },
            { short: 'nov.', long: 'noviembre' },
            { short: 'dic.', long: 'diciembre' }
        ],
        selectedFormat: "dd/mm/yyyy"
    },
    Ger: {
        weekDayFormat: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
        monthStrList: [
            { short: 'Jan', long: 'Januar' },
            { short: 'Feb', long: 'Februar' },
            { short: 'Mär', long: 'Marz' },
            { short: 'Apr', long: 'April' },
            { short: 'Mai', long: 'Mai' },
            { short: 'Jun', long: 'Juni' },
            { short: 'Jnl', long: 'Juli' },
            { short: 'Aug', long: 'August' },
            { short: 'Sep', long: 'September' },
            { short: 'Okt', long: 'Oktober' },
            { short: 'Nov', long: 'November' },
            { short: 'Dez', long: 'Dezember' }
        ],
        selectedFormat: "dd/mm/yyyy"
    },
    JPN: {
        weekDayFormat: ['日', '月', '火', '水', '木', '金', '土'],
        monthStrList: [
            { short: 'いちがつ', long: 'いちがつ' },
            { short: 'にがつ', long: 'にがつ' },
            { short: 'さんがつ', long: 'さんがつ' },
            { short: 'しがつ', long: 'しがつ' },
            { short: 'ごがつ', long: 'ごがつ' },
            { short: 'ろくがつ', long: 'ろくがつ' },
            { short: 'しちがつ', long: 'しちがつ' },
            { short: 'はちがつ', long: 'はちがつ' },
            { short: 'くがつ', long: 'くがつ' },
            { short: 'じゅうがつ', long: 'じゅうがつ' },
            { short: 'じゅういちがつ', long: 'じゅういちがつ' },
            { short: 'じゅうにがつ', long: 'じゅうにがつ' }
        ],
        selectedFormat: "yyyy/mm/dd"
    },
    KO: {
        weekDayFormat: ['일', '월', '화', '수', '목', '금', '토'],
        monthStrList: [
            { short: '일월', long: '일월' },
            { short: '이월', long: '이월' },
            { short: '삼월', long: '삼월' },
            { short: '사월', long: '사월' },
            { short: '오월', long: '오월' },
            { short: '육월', long: '육월' },
            { short: '칠월', long: '칠월' },
            { short: '팔월', long: '팔월' },
            { short: '구월', long: '구월' },
            { short: '십월', long: '십월' },
            { short: '십일월', long: '십일월' },
            { short: '십이월', long: '십이월' }
        ],
        selectedFormat: "yyyy/mm/dd"
    }
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
    constructor(datePickerService, localeService) {
        this.datePickerService = datePickerService;
        this.localeService = localeService;
        this.isShowMonthList = false;
        this.isShowYearList = false;
        this.isShowDateList = true;
        this.isShowCalendar = false;
        this.currentLanguage = "en_US";
        this.onDateChange = new EventEmitter();
        this.calendarWidth = 200;
        this.startWithSundayOrMonday = 0;
    }
    ngOnInit() {
        if (!this.checkIsHaveThisLang()) {
            this.currentLanguage = "en_US";
            throw new SyntaxError(`The language ${this.currentLanguage} you setuped cannot supported and the default language will be displayed with 'en_US'`);
        }
        const initCalendarDate = this.displayStrings || initDate[this.currentLanguage];
        this.selectedFormat = (this.displayStrings && this.displayStrings.selectedFormat) || initDate[this.currentLanguage].selectedFormat || "en_US";
        this.initCalendar(initCalendarDate);
        this.selectedDate = null;
        this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
        this.monthStrList = initCalendarDate.monthStrList;
        this.yearStrList = this.datePickerService.getYearList(this.currentYear);
        this.localeService.userLocaleChanged.subscribe((item) => {
            if (item == 'es-US') {
                this.startWithSundayOrMonday = 0;
                this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
            }
            else {
                this.startWithSundayOrMonday = 1;
                this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
            }
            console.log("userLocaleChanged:" + item);
        });
    }
    initCalendar(options) {
        this.weekDayFormat = options.weekDayFormat;
        if (options.weekDayFormat.length != 7) {
            throw SyntaxError("You cannot set a weekdayList with a length less than 7.");
        }
        let nowDate = new Date();
        this.currentYear = nowDate.getFullYear();
        this.currentMonth = nowDate.getMonth() + 1;
        this.currentDate = nowDate.getDate();
    }
    checkIsHaveThisLang() {
        return initDate.hasOwnProperty(this.currentLanguage);
    }
    checkWeekDayFormat(weekList) {
        let isCorrentFormat;
        if (weekList.length != 7) {
            throw SyntaxError("You cannot set a weekdayList with a length less than 7.");
        }
    }
    preMonth() {
        if (this.currentMonth > 1) {
            this.currentMonth--;
            this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
        }
        else if (this.currentMonth == 1) {
            this.currentYear--;
            this.currentMonth = 12;
            this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
        }
    }
    nextMonth() {
        if (this.currentMonth < 12) {
            this.currentMonth++;
            this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
        }
        else if (this.currentMonth == 12) {
            this.currentYear++;
            this.currentMonth = 1;
            this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
        }
    }
    getDateDidplayFormat() {
        if (!(/\//g.test(this.selectedFormat))) {
            throw new SyntaxError("The delimiter for the time format should be '/' ");
        }
        if (this.selectedDate && this.selectedFormat) {
            let selected = this.selectedDate.split("/");
            let formatList = this.selectedFormat.split("/");
            let str = [];
            let selDay = selected[0];
            let selMonth = selected[1];
            let selYear = selected[2];
            formatList && formatList.forEach(item => {
                if (item.toLowerCase() === 'dd') {
                    str.push(selDay.length == 1 ? `0${selDay}` : selDay);
                }
                else if (item.toLowerCase() === 'mm') {
                    str.push(selMonth.length == 1 ? `0${selMonth}` : selMonth);
                }
                else if (item.toLowerCase() === 'yyyy') {
                    str.push(selYear);
                }
                else {
                    throw new SyntaxError("The date format you entered is incorrect. Please refer to the correct format, such as 'mm/dd/yyyy' | 'dd/mm/yyyy' | 'yyyy/mm/dd'");
                }
            });
            return `${str[0]}\/${str[1]}\/${str[2]}`;
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
        this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, selected, this.startWithSundayOrMonday);
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
        this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
        this.isShowMonthList = !this.isShowMonthList;
        this.isShowDateList = !this.isShowDateList;
    }
    clickYearHandel(year) {
        this.currentYear = year || this.currentYear;
        this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
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
                this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
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
DatePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerComponent, deps: [{ token: DatePickerService }, { token: i2.LocaleService }], target: i0.ɵɵFactoryTarget.Component });
DatePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.10", type: DatePickerComponent, selector: "clarity-date-picker", inputs: { displayStrings: "displayStrings", calendarWidth: "calendarWidth", startWithSundayOrMonday: "startWithSundayOrMonday" }, outputs: { onDateChange: "onDateChange" }, ngImport: i0, template: "<div id=\"calendar\" (clickOutside)=\"closeDateBox()\" [style.width]=\"calendarWidth + 'px'\">\n  <div class=\"calendarInputBox\" [style.width]=\"calendarWidth + 'px'\">\n    <div style=\"display:flex; flex-direction: column;\">\n      <input type=\"text\" id='ipt' [style.width]=\"calendarWidth + 'px'\" value=\"{{getDateDidplayFormat()}}\" readonly>\n      <div  class=\"bottomLine\" [style.width]=\"calendarWidth + 'px'\"></div>\n    </div>\n    \n    <svg (click)=\"showCalendar()\" class=\"icon\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n      <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"20\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"20\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect x=\"20\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n      <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n    </svg>\n  </div>\n  \n  <div  *ngIf=\"weekDayFormat && weekDayFormat.length == 7\" class=\"container-calendar-box\" [style.display]=\"isShowCalendar ? 'block' : 'none' \">\n    <div [style.display]=\"isShowDateList ? 'block' : 'none'\">\n      <div class=\"month-year-change\">\n        <div class=\"month-year-display\">\n          <!-- <span (click)=\"showMonthList()\">{{monthStrList[currentMonth-1].short}}</span> -->\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 1\">{{'month.list.short.jan' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 2\">{{'month.list.short.feb' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 3\">{{'month.list.short.mar' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 4\">{{'month.list.short.apr' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 5\">{{'month.list.short.may' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 6\">{{'month.list.short.jun' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 7\">{{'month.list.short.jul' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 8\">{{'month.list.short.aug' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 9\">{{'month.list.short.sep' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 10\">{{'month.list.short.oct' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 11\">{{'month.list.short.nov' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 12\">{{'month.list.short.dec' | vtranslate}}</span>\n          <span (click)=\"showYearList()\">{{currentYear}}</span>\n        </div>\n        <div class=\"change-button\">\n          <span (click)=\"preMonth()\">\n            <svg style=\"transform: rotate(-90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n          <span>\n            <svg (click)=\"gotoCurrentMonth()\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M16.17,25.86,10.81,20.5a1,1,0,0,1,1.41-1.41L16.17,23l8.64-8.64a1,1,0,0,1,1.41,1.41Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n              <rect x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n            </svg>\n          </span>\n          <span (click)=\"nextMonth()\">\n            <svg style=\"transform: rotate(90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n        </div>\n        \n      </div>\n      <div class=\"day-list\" id=\"myTable\">\n        <div class=\"weekDayList\">\n          <!-- <span *ngFor=\"let weekDay of weekDayFormat\">{{weekDay}}</span> -->\n          <span [style.display]=\"(startWithSundayOrMonday == 0 || startWithSundayOrMonday == '0') ? 'inline-block' : 'none'\">{{'week.list.sunday' | vtranslate}}</span>\n          <span>{{'week.list.monday' | vtranslate}}</span>\n          <span>{{'week.list.tuesday' | vtranslate}}</span>\n          <span>{{'week.list.wednesday' | vtranslate}}</span>\n          <span>{{'week.list.thursday' | vtranslate}}</span>\n          <span>{{'week.list.friday' | vtranslate}}</span>\n          <span>{{'week.list.saturday' | vtranslate}}</span>\n          <span [style.display]=\"(startWithSundayOrMonday == 1 || startWithSundayOrMonday == '1') ? 'inline-block' : 'none'\">{{'week.list.sunday' | vtranslate}}</span>\n        </div>\n        <div class=\"dayBox\">\n          <div class=\"row-list\">\n            <button (click)=\"clickDateHandel(item.date)\"  *ngFor=\"let item of totalCurrentMonthDaysList\">\n              <span [style.display]=\"!selectedDate ? 'block' : 'none'\" [ngClass]=\"{'notCurrentMonthDateStyle':!item.isCurrentMonth, 'currentDateBgcolor': item.isToday && item.isCurrentMonth && !selectedDate, 'currentDateFontWeight': item.isToday && item.isCurrentMonth}\">\n                {{item.date}}\n              </span>\n              <span [style.display]=\"selectedDate ? 'block' : 'none'\" [ngClass]=\"{ 'selectedDateBgColor': item.isSelected, 'notCurrentMonthDateStyle':!item.isCurrentMonth, 'currentDateBgcolor': item.isToday && item.isCurrentMonth && !item.isSelected && !selectedDate, 'currentDateFontWeight': item.isToday && item.isCurrentMonth}\">\n                {{item.date}}\n              </span>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  \n    <div class=\"month-select-box\" [style.display]=\"isShowMonthList ? 'block' : 'none'\">\n      <!-- <button (click)=\"clickMonthHandel(index+1)\" [ngClass]=\"{'monthSelected': (index+1) == currentMonth}\" *ngFor=\"let month of monthStrList; let index = index\">{{month.long}}</button> -->\n      <button (click)=\"clickMonthHandel(1)\" [ngClass]=\"{'monthSelected': currentMonth == 1}\">{{'month.list.long.jan' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(2)\" [ngClass]=\"{'monthSelected': currentMonth == 2}\">{{'month.list.long.feb' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(3)\" [ngClass]=\"{'monthSelected': currentMonth == 3}\">{{'month.list.long.mar' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(4)\" [ngClass]=\"{'monthSelected': currentMonth == 4}\">{{'month.list.long.apr' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(5)\" [ngClass]=\"{'monthSelected': currentMonth == 5}\">{{'month.list.long.may' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(6)\" [ngClass]=\"{'monthSelected': currentMonth == 6}\">{{'month.list.long.jun' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(7)\" [ngClass]=\"{'monthSelected': currentMonth == 7}\">{{'month.list.long.jul' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(8)\" [ngClass]=\"{'monthSelected': currentMonth == 8}\">{{'month.list.long.aug' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(9)\" [ngClass]=\"{'monthSelected': currentMonth == 9}\">{{'month.list.long.sep' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(10)\" [ngClass]=\"{'monthSelected': currentMonth == 10}\">{{'month.list.long.oct' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(11)\" [ngClass]=\"{'monthSelected': currentMonth == 11}\">{{'month.list.long.nov' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(12)\" [ngClass]=\"{'monthSelected': currentMonth == 12}\">{{'month.list.long.dec' | vtranslate}}</button>\n    </div>\n  \n    <div class=\"year-select-box\" [style.display]=\"isShowYearList ? 'block' : 'none'\">\n      <div style=\"display:flex; justify-content: center;width: 100%;\">\n        <div class=\"change-button\">\n          <span (click)=\"preMonthList()\">\n            <svg style=\"transform: rotate(-90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n          <span>\n            <svg (click)=\"gotoCurrentYear()\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M16.17,25.86,10.81,20.5a1,1,0,0,1,1.41-1.41L16.17,23l8.64-8.64a1,1,0,0,1,1.41,1.41Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n              <rect x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n            </svg>\n          </span>\n          <span (click)=\"nextMonthList()\">\n            <svg style=\"transform: rotate(90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n        </div>\n      </div>\n      <div style=\"height: 92%; display: flex; flex-direction: column; flex-wrap: wrap;\">\n        <button (click)=\"clickYearHandel(year)\" [ngClass]=\"{'yearSelected': year == currentYear}\" *ngFor=\"let year of yearStrList; let index = index\">{{year}}</button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: ["#calendar{display:inline-block;position:relative}#calendar .calendarInputBox{display:flex;justify-content:flex-end;width:200px;height:24px}#calendar #ipt{width:200px;border:0;height:24px;outline:none;background:none}#calendar .bottomLine{width:200px;height:1px;background-color:#6d7a80;position:absolute;top:20px;left:0px}#calendar .container-calendar-box{box-sizing:content-box;width:280px;height:315px;background-color:#fff;border:1px solid #cccccc;border-radius:5px;padding:10px;display:block;text-align:center;font-family:Metropolis,Avenir Next,Helvetica Neue,Arial,sans-serif;position:absolute;z-index:2000;top:30px;left:5px}#calendar .container-calendar-box .day-list{width:280px;font-size:14px;color:#676767}#calendar .container-calendar-box .day-list .weekDayList>span{display:inline-block;width:36px;height:36px;text-align:center;line-height:36px;font-weight:600}#calendar .container-calendar-box .day-list .dayBox .row-list{display:flex;justify-content:space-between;flex-wrap:wrap}#calendar .container-calendar-box .day-list .dayBox .row-list button{width:36px;height:36px;font-size:14px;border:none;background-color:#fff;color:#696969;padding:0}#calendar .container-calendar-box .day-list .dayBox .row-list button span{display:inline-block;width:36px;height:36px;border-radius:3px;text-align:center;line-height:36px}#calendar .container-calendar-box .day-list .dayBox .row-list button:hover{background:#e8e8e8;cursor:pointer;border-radius:3px}#calendar .container-calendar-box .day-list .weekDayList{display:flex;justify-content:space-between}#calendar .container-calendar-box .month-year-change{font-size:18px;color:#0072a3;height:40px;display:flex;justify-content:space-between;padding:0 10px 10px;align-items:center}#calendar .container-calendar-box .month-year-change .month-year-display span{display:inline-block;cursor:pointer;padding:8px 7px}#calendar .container-calendar-box .month-year-change .month-year-display span:hover{background-color:#e8e8e8;border-radius:3px}#calendar .container-calendar-box .month-year-change .month-year-display span:first-child{text-align:center;margin-right:1px}#calendar .container-calendar-box .month-year-change .change-button{width:90px;display:flex;justify-content:space-between;align-items:center}#calendar .container-calendar-box .month-year-change .change-button svg{width:20px;height:20px;color:#0072a3}#calendar .container-calendar-box .month-year-change .change-button>span:hover{cursor:pointer}#calendar .container-calendar-box .month-select-box{display:flex;flex-direction:column;flex-wrap:wrap;width:100%;height:100%}#calendar .container-calendar-box .month-select-box button{width:50%;height:16.6%;font-size:18px;color:#666;border:none;background:none}#calendar .container-calendar-box .month-select-box button.monthSelected{background-color:#dae3e8;color:#1b1c1d;border-radius:3px}#calendar .container-calendar-box .month-select-box button:hover{background:#e8e8e8;border-radius:3px;color:#000}#calendar .container-calendar-box .year-select-box{display:flex;flex-direction:column;flex-wrap:wrap;width:100%;height:100%}#calendar .container-calendar-box .year-select-box .change-button{width:90px;display:flex;justify-content:space-between;align-items:center}#calendar .container-calendar-box .year-select-box .change-button svg{width:20px;height:20px;color:#0072a3}#calendar .container-calendar-box .year-select-box .change-button>span:hover{cursor:pointer}#calendar .container-calendar-box .year-select-box div button{width:50%;height:20%;font-size:18px;color:#666;border:none;background:none}#calendar .container-calendar-box .year-select-box div button.yearSelected{background-color:#dae3e8;color:#1b1c1d;border-radius:3px}#calendar .container-calendar-box .year-select-box div button:hover{background:#e8e8e8;border-radius:3px;color:#000}.notCurrentMonthDateStyle{color:#c2c2c2}.currentDateBgcolor{background-color:#e8e8e8}.currentDateFontWeight{font-weight:600;color:#1b1c1d}.selectedDateBgColor{background-color:#dae3e8;color:#1b1c1d}.icon{width:20px;height:20px;color:#0072a3;margin-left:-30px;cursor:pointer}\n"], directives: [{ type: ClickOutsideDirective, selector: "[clickOutside]", outputs: ["clickOutside"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "vtranslate": i2.L10nPipePlus } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clarity-date-picker', template: "<div id=\"calendar\" (clickOutside)=\"closeDateBox()\" [style.width]=\"calendarWidth + 'px'\">\n  <div class=\"calendarInputBox\" [style.width]=\"calendarWidth + 'px'\">\n    <div style=\"display:flex; flex-direction: column;\">\n      <input type=\"text\" id='ipt' [style.width]=\"calendarWidth + 'px'\" value=\"{{getDateDidplayFormat()}}\" readonly>\n      <div  class=\"bottomLine\" [style.width]=\"calendarWidth + 'px'\"></div>\n    </div>\n    \n    <svg (click)=\"showCalendar()\" class=\"icon\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n      <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"20\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"14\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"20\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"19\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"8\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"14\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect x=\"20\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"26\" y=\"24\" width=\"2\" height=\"2\"></rect>\n      <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n      <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n      <rect fill=\"rgb(0, 114, 163)\" x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n    </svg>\n  </div>\n  \n  <div  *ngIf=\"weekDayFormat && weekDayFormat.length == 7\" class=\"container-calendar-box\" [style.display]=\"isShowCalendar ? 'block' : 'none' \">\n    <div [style.display]=\"isShowDateList ? 'block' : 'none'\">\n      <div class=\"month-year-change\">\n        <div class=\"month-year-display\">\n          <!-- <span (click)=\"showMonthList()\">{{monthStrList[currentMonth-1].short}}</span> -->\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 1\">{{'month.list.short.jan' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 2\">{{'month.list.short.feb' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 3\">{{'month.list.short.mar' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 4\">{{'month.list.short.apr' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 5\">{{'month.list.short.may' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 6\">{{'month.list.short.jun' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 7\">{{'month.list.short.jul' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 8\">{{'month.list.short.aug' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 9\">{{'month.list.short.sep' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 10\">{{'month.list.short.oct' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 11\">{{'month.list.short.nov' | vtranslate}}</span>\n          <span (click)=\"showMonthList()\" *ngIf=\"currentMonth == 12\">{{'month.list.short.dec' | vtranslate}}</span>\n          <span (click)=\"showYearList()\">{{currentYear}}</span>\n        </div>\n        <div class=\"change-button\">\n          <span (click)=\"preMonth()\">\n            <svg style=\"transform: rotate(-90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n          <span>\n            <svg (click)=\"gotoCurrentMonth()\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M16.17,25.86,10.81,20.5a1,1,0,0,1,1.41-1.41L16.17,23l8.64-8.64a1,1,0,0,1,1.41,1.41Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n              <rect x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n            </svg>\n          </span>\n          <span (click)=\"nextMonth()\">\n            <svg style=\"transform: rotate(90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n        </div>\n        \n      </div>\n      <div class=\"day-list\" id=\"myTable\">\n        <div class=\"weekDayList\">\n          <!-- <span *ngFor=\"let weekDay of weekDayFormat\">{{weekDay}}</span> -->\n          <span [style.display]=\"(startWithSundayOrMonday == 0 || startWithSundayOrMonday == '0') ? 'inline-block' : 'none'\">{{'week.list.sunday' | vtranslate}}</span>\n          <span>{{'week.list.monday' | vtranslate}}</span>\n          <span>{{'week.list.tuesday' | vtranslate}}</span>\n          <span>{{'week.list.wednesday' | vtranslate}}</span>\n          <span>{{'week.list.thursday' | vtranslate}}</span>\n          <span>{{'week.list.friday' | vtranslate}}</span>\n          <span>{{'week.list.saturday' | vtranslate}}</span>\n          <span [style.display]=\"(startWithSundayOrMonday == 1 || startWithSundayOrMonday == '1') ? 'inline-block' : 'none'\">{{'week.list.sunday' | vtranslate}}</span>\n        </div>\n        <div class=\"dayBox\">\n          <div class=\"row-list\">\n            <button (click)=\"clickDateHandel(item.date)\"  *ngFor=\"let item of totalCurrentMonthDaysList\">\n              <span [style.display]=\"!selectedDate ? 'block' : 'none'\" [ngClass]=\"{'notCurrentMonthDateStyle':!item.isCurrentMonth, 'currentDateBgcolor': item.isToday && item.isCurrentMonth && !selectedDate, 'currentDateFontWeight': item.isToday && item.isCurrentMonth}\">\n                {{item.date}}\n              </span>\n              <span [style.display]=\"selectedDate ? 'block' : 'none'\" [ngClass]=\"{ 'selectedDateBgColor': item.isSelected, 'notCurrentMonthDateStyle':!item.isCurrentMonth, 'currentDateBgcolor': item.isToday && item.isCurrentMonth && !item.isSelected && !selectedDate, 'currentDateFontWeight': item.isToday && item.isCurrentMonth}\">\n                {{item.date}}\n              </span>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  \n    <div class=\"month-select-box\" [style.display]=\"isShowMonthList ? 'block' : 'none'\">\n      <!-- <button (click)=\"clickMonthHandel(index+1)\" [ngClass]=\"{'monthSelected': (index+1) == currentMonth}\" *ngFor=\"let month of monthStrList; let index = index\">{{month.long}}</button> -->\n      <button (click)=\"clickMonthHandel(1)\" [ngClass]=\"{'monthSelected': currentMonth == 1}\">{{'month.list.long.jan' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(2)\" [ngClass]=\"{'monthSelected': currentMonth == 2}\">{{'month.list.long.feb' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(3)\" [ngClass]=\"{'monthSelected': currentMonth == 3}\">{{'month.list.long.mar' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(4)\" [ngClass]=\"{'monthSelected': currentMonth == 4}\">{{'month.list.long.apr' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(5)\" [ngClass]=\"{'monthSelected': currentMonth == 5}\">{{'month.list.long.may' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(6)\" [ngClass]=\"{'monthSelected': currentMonth == 6}\">{{'month.list.long.jun' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(7)\" [ngClass]=\"{'monthSelected': currentMonth == 7}\">{{'month.list.long.jul' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(8)\" [ngClass]=\"{'monthSelected': currentMonth == 8}\">{{'month.list.long.aug' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(9)\" [ngClass]=\"{'monthSelected': currentMonth == 9}\">{{'month.list.long.sep' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(10)\" [ngClass]=\"{'monthSelected': currentMonth == 10}\">{{'month.list.long.oct' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(11)\" [ngClass]=\"{'monthSelected': currentMonth == 11}\">{{'month.list.long.nov' | vtranslate}}</button>\n      <button (click)=\"clickMonthHandel(12)\" [ngClass]=\"{'monthSelected': currentMonth == 12}\">{{'month.list.long.dec' | vtranslate}}</button>\n    </div>\n  \n    <div class=\"year-select-box\" [style.display]=\"isShowYearList ? 'block' : 'none'\">\n      <div style=\"display:flex; justify-content: center;width: 100%;\">\n        <div class=\"change-button\">\n          <span (click)=\"preMonthList()\">\n            <svg style=\"transform: rotate(-90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n          <span>\n            <svg (click)=\"gotoCurrentYear()\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M16.17,25.86,10.81,20.5a1,1,0,0,1,1.41-1.41L16.17,23l8.64-8.64a1,1,0,0,1,1.41,1.41Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M32.25,6H29V8h3V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z\"></path>\n              <path fill=\"rgb(0, 114, 163)\" d=\"M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z\"></path>\n              <rect x=\"13\" y=\"6\" width=\"10\" height=\"2\"></rect>\n            </svg>\n          </span>\n          <span (click)=\"nextMonthList()\">\n            <svg style=\"transform: rotate(90deg);\" viewBox=\"0 0 36 36\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n              <path fill=\"rgb(0, 114, 163)\" d=\"M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z\"></path>\n            </svg>\n          </span>\n        </div>\n      </div>\n      <div style=\"height: 92%; display: flex; flex-direction: column; flex-wrap: wrap;\">\n        <button (click)=\"clickYearHandel(year)\" [ngClass]=\"{'yearSelected': year == currentYear}\" *ngFor=\"let year of yearStrList; let index = index\">{{year}}</button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: ["#calendar{display:inline-block;position:relative}#calendar .calendarInputBox{display:flex;justify-content:flex-end;width:200px;height:24px}#calendar #ipt{width:200px;border:0;height:24px;outline:none;background:none}#calendar .bottomLine{width:200px;height:1px;background-color:#6d7a80;position:absolute;top:20px;left:0px}#calendar .container-calendar-box{box-sizing:content-box;width:280px;height:315px;background-color:#fff;border:1px solid #cccccc;border-radius:5px;padding:10px;display:block;text-align:center;font-family:Metropolis,Avenir Next,Helvetica Neue,Arial,sans-serif;position:absolute;z-index:2000;top:30px;left:5px}#calendar .container-calendar-box .day-list{width:280px;font-size:14px;color:#676767}#calendar .container-calendar-box .day-list .weekDayList>span{display:inline-block;width:36px;height:36px;text-align:center;line-height:36px;font-weight:600}#calendar .container-calendar-box .day-list .dayBox .row-list{display:flex;justify-content:space-between;flex-wrap:wrap}#calendar .container-calendar-box .day-list .dayBox .row-list button{width:36px;height:36px;font-size:14px;border:none;background-color:#fff;color:#696969;padding:0}#calendar .container-calendar-box .day-list .dayBox .row-list button span{display:inline-block;width:36px;height:36px;border-radius:3px;text-align:center;line-height:36px}#calendar .container-calendar-box .day-list .dayBox .row-list button:hover{background:#e8e8e8;cursor:pointer;border-radius:3px}#calendar .container-calendar-box .day-list .weekDayList{display:flex;justify-content:space-between}#calendar .container-calendar-box .month-year-change{font-size:18px;color:#0072a3;height:40px;display:flex;justify-content:space-between;padding:0 10px 10px;align-items:center}#calendar .container-calendar-box .month-year-change .month-year-display span{display:inline-block;cursor:pointer;padding:8px 7px}#calendar .container-calendar-box .month-year-change .month-year-display span:hover{background-color:#e8e8e8;border-radius:3px}#calendar .container-calendar-box .month-year-change .month-year-display span:first-child{text-align:center;margin-right:1px}#calendar .container-calendar-box .month-year-change .change-button{width:90px;display:flex;justify-content:space-between;align-items:center}#calendar .container-calendar-box .month-year-change .change-button svg{width:20px;height:20px;color:#0072a3}#calendar .container-calendar-box .month-year-change .change-button>span:hover{cursor:pointer}#calendar .container-calendar-box .month-select-box{display:flex;flex-direction:column;flex-wrap:wrap;width:100%;height:100%}#calendar .container-calendar-box .month-select-box button{width:50%;height:16.6%;font-size:18px;color:#666;border:none;background:none}#calendar .container-calendar-box .month-select-box button.monthSelected{background-color:#dae3e8;color:#1b1c1d;border-radius:3px}#calendar .container-calendar-box .month-select-box button:hover{background:#e8e8e8;border-radius:3px;color:#000}#calendar .container-calendar-box .year-select-box{display:flex;flex-direction:column;flex-wrap:wrap;width:100%;height:100%}#calendar .container-calendar-box .year-select-box .change-button{width:90px;display:flex;justify-content:space-between;align-items:center}#calendar .container-calendar-box .year-select-box .change-button svg{width:20px;height:20px;color:#0072a3}#calendar .container-calendar-box .year-select-box .change-button>span:hover{cursor:pointer}#calendar .container-calendar-box .year-select-box div button{width:50%;height:20%;font-size:18px;color:#666;border:none;background:none}#calendar .container-calendar-box .year-select-box div button.yearSelected{background-color:#dae3e8;color:#1b1c1d;border-radius:3px}#calendar .container-calendar-box .year-select-box div button:hover{background:#e8e8e8;border-radius:3px;color:#000}.notCurrentMonthDateStyle{color:#c2c2c2}.currentDateBgcolor{background-color:#e8e8e8}.currentDateFontWeight{font-weight:600;color:#1b1c1d}.selectedDateBgColor{background-color:#dae3e8;color:#1b1c1d}.icon{width:20px;height:20px;color:#0072a3;margin-left:-30px;cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: DatePickerService }, { type: i2.LocaleService }]; }, propDecorators: { onDateChange: [{
                type: Output
            }], displayStrings: [{
                type: Input
            }], calendarWidth: [{
                type: Input
            }], startWithSundayOrMonday: [{
                type: Input
            }] } });

const ENGLISH = {
    'week.list.sunday': 'S',
    'week.list.monday': 'M',
    'week.list.tuesday': 'T',
    'week.list.wednesday': 'W',
    'week.list.thursday': 'T',
    'week.list.friday': 'F',
    'week.list.saturday': 'S',
    'month.list.short.jan': 'Jan',
    'month.list.short.feb': 'Feb',
    'month.list.short.mar': 'Mar',
    'month.list.short.apr': 'Apr',
    'month.list.short.may': 'May',
    'month.list.short.jun': 'Jun',
    'month.list.short.jul': 'Jul',
    'month.list.short.aug': 'Aug',
    'month.list.short.sep': 'Sep',
    'month.list.short.oct': 'Oct',
    'month.list.short.nov': 'Nov',
    'month.list.short.dec': 'Dec',
    'month.list.long.jan': 'January',
    'month.list.long.feb': 'February',
    'month.list.long.mar': 'March',
    'month.list.long.apr': 'April',
    'month.list.long.may': 'May',
    'month.list.long.jun': 'June',
    'month.list.long.jul': 'July',
    'month.list.long.aug': 'August',
    'month.list.long.sep': 'September',
    'month.list.long.oct': 'October',
    'month.list.long.nov': 'November',
    'month.list.long.dec': 'December',
    'date.selected.format': 'mm/dd/yyyy'
};

const I18nConfig = {
    productID: 'SampleApp',
    component: 'datePicker',
    version: '1.0.0',
    i18nScope: [
        PatternCategories.DATE,
        PatternCategories.NUMBER,
        PatternCategories.CURRENCIES
    ],
    host: 'https://localhost:8091/',
    // By default, the resources of each component are isolated.
    // Please set isolated as false in a shared module.
    isolated: false,
    sourceBundles: [ENGLISH]
};

class DatePickerModule {
    constructor(vipService) {
        this.vipService = vipService;
        // register feature module configuration
        vipService.registerComponent(I18nConfig);
    }
}
DatePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerModule, deps: [{ token: i2.VIPService }], target: i0.ɵɵFactoryTarget.NgModule });
DatePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: DatePickerModule, declarations: [DatePickerComponent,
        ClickOutsideDirective], imports: [CommonModule, i2.VIPModule], exports: [DatePickerComponent] });
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
        }], ctorParameters: function () { return [{ type: i2.VIPService }]; } });

/*
 * Public API Surface of date-picker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DatePickerComponent, DatePickerModule, DatePickerService };
//# sourceMappingURL=vip-datepicker.mjs.map
