import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePickerService } from './date-picker.service';
import { init, initDate } from './date-picker.model';
import { LocaleService, I18nService } from '@vmw/ngx-vip';

@Component({
  selector: 'clarity-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  weekDayFormat: any;
  defaultDate: any;
  totalCurrentMonthDaysList: any;
  currentYear!: number;
  currentMonth!: number;
  currentDate!: number;
  monthStrList!: any;
  yearStrList!: any;
  selectedDate!: any;
  isShowMonthList: boolean = false;
  isShowYearList: boolean = false;
  isShowDateList: boolean = true;
  isShowCalendar: boolean = false;
  currentLanguage: any = "en_US";
  firstDayOfWeek: any;
  
  @Output() 
  private onDateChange = new EventEmitter();
  @Input()
  public displayStrings!: init;
  selectedFormat!: string;
  
  @Input()
  public calendarWidth: any = 200;
  @Input()
  startWithSundayOrMonday: number | string = 0;

  constructor(private datePickerService: DatePickerService, private localeService: LocaleService, private i18nService: I18nService) { }

  ngOnInit(): void {
    if (!this.checkIsHaveThisLang()) {
      this.currentLanguage = "en_US";
      throw new SyntaxError(`The language ${this.currentLanguage} you setuped cannot supported and the default language will be displayed with 'en_US'`)
    }
    const initCalendarDate: any = this.displayStrings || (initDate as any)[this.currentLanguage];
    this.selectedFormat = (this.displayStrings && this.displayStrings.selectedFormat) || (initDate as any)[this.currentLanguage].selectedFormat || "en_US";
    this.initCalendar(initCalendarDate);
    this.selectedDate = null;
    this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
    this.monthStrList = initCalendarDate.monthStrList;
    this.yearStrList = this.datePickerService.getYearList(this.currentYear);
    
    this.localeChangedHandel();
  }

  localeChangedHandel() {
    this.localeService.userLocaleChanged.subscribe((locale) => {
      const localeDate = this.i18nService.resolveLocaleData(locale);
      this.firstDayOfWeek = localeDate && localeDate.dates.firstDayOfWeek ? localeDate.dates.firstDayOfWeek : 0;
      this.startWithSundayOrMonday = this.firstDayOfWeek;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
      console.log("userLocaleChanged:" + locale);
    })  
  }

  initCalendar(options:any){
    this.weekDayFormat = options.weekDayFormat;
    if (options.weekDayFormat.length != 7) {
      throw SyntaxError("You cannot set a weekdayList with a length less than 7.");
    }
    let nowDate = new Date()
    this.currentYear = nowDate.getFullYear();
    this.currentMonth = nowDate.getMonth() + 1;
    this.currentDate = nowDate.getDate();
  }

  checkIsHaveThisLang() {
    return initDate.hasOwnProperty(this.currentLanguage);
  }

  checkWeekDayFormat(weekList: string[]) {
    let isCorrentFormat: boolean;
    if (weekList.length != 7) {
      throw SyntaxError("You cannot set a weekdayList with a length less than 7.");
    }
  }

  preMonth() {
    if (this.currentMonth > 1) {
      this.currentMonth --;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
    } else if(this.currentMonth == 1) {
      this.currentYear --;
      this.currentMonth = 12;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
    }
  }

  nextMonth() {
    if (this.currentMonth < 12) {
      this.currentMonth ++;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
    } else if (this.currentMonth == 12) {
      this.currentYear ++;
      this.currentMonth = 1;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
    }
  }
  
  getDateDisplayFormat() {
    if(!(/\//g.test(this.selectedFormat))) {
      throw new SyntaxError("The delimiter for the time format should be '/' ");
    }
    if(this.selectedDate && this.selectedFormat) {
      let selected: any = this.selectedDate.split("/");
      let formatList = this.selectedFormat.split("/");
      let str: any = [];
      let selDay = selected[0];
      let selMonth = selected[1];
      let selYear = selected[2];

      formatList && formatList.forEach(item => {
        if (item.toLowerCase() === 'dd') {
          str.push(selDay.length == 1 ? `0${selDay}` : selDay);
        } else if(item.toLowerCase() === 'mm') {
          str.push(selMonth.length == 1 ? `0${selMonth}` : selMonth);
        } else if(item.toLowerCase() === 'yyyy') {
          str.push(selYear);
        } else {
          throw new SyntaxError("The date format you entered is incorrect. Please refer to the correct format, such as 'mm/dd/yyyy' | 'dd/mm/yyyy' | 'yyyy/mm/dd'")
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
  
  clickDateHandel(date: string) {
    let d = (date && Number(date)) || (this.currentDate && Number(this.currentDate));
    let selected = `${d}\/${this.currentMonth}\/${this.currentYear}`;
    this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, selected, this.startWithSundayOrMonday);
    this.selectedDate = selected;
    this.isShowCalendar = false;
    this.onDateChange.emit(selected);

  }

  showMonthList() {
    this.isShowMonthList = true;
    this.isShowDateList = false
  }

  showYearList() {
    this.isShowYearList = true;
    this.isShowDateList = false;
  }

  clickMonthHandel(month: number){
    this.currentMonth = month || this.currentMonth;
    this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startWithSundayOrMonday);
    this.isShowMonthList = !this.isShowMonthList;
    this.isShowDateList = !this.isShowDateList;
  }

  clickYearHandel(year: number) {
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
      } else {
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
