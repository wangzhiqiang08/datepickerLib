import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePickerService } from './date-picker.service';
import { SOURCE_LOCALE_DATA } from './date-picker.model';
import { LocaleService, I18nService, VIPService } from '@vmw/ngx-vip';

@Component({
  selector: 'clarity-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  defaultDate: any;
  totalCurrentMonthDaysList: any;
  currentYear!: number;
  currentMonth!: number;
  currentDate!: number;
  yearStrList!: any;
  selectedDate!: any;
  isShowMonthList: boolean = false;
  isShowYearList: boolean = false;
  isShowDateList: boolean = true;
  isShowCalendar: boolean = false;
  isYearShowAtLeft!: boolean;
  sourceLocaleData: any = SOURCE_LOCALE_DATA;
  weekList: any = SOURCE_LOCALE_DATA.categories.dates.daysFormat.narrow;
  monthList_wide: Array<string> = SOURCE_LOCALE_DATA.categories.dates.monthsFormat.wide;
  monthList_abbreviated: Array<string> = SOURCE_LOCALE_DATA.categories.dates.monthsFormat.abbreviated;
  
  @Output() 
  private onDateChange = new EventEmitter();
  
  @Input()
  public calendarWidth: any = 200;
  @Input()
  startDay: number | string = 0;

  constructor(private datePickerService: DatePickerService, private localeService: LocaleService, private i18nService: I18nService, private VIPService: VIPService) { }

  ngOnInit(): void {
    this.initCalendar();
    this.selectedDate = null;
    this.yearStrList = this.datePickerService.getYearList(this.currentYear);
    this.localeChangedHandel();
  }

  localeChangedHandel() {
    this.localeService.userLocaleChanged.subscribe(async (locale) => {
      await this.VIPService.loadLocaleData();
      this.sourceLocaleData = this.i18nService.resolveLocaleData(locale)
      this.weekList = this.sourceLocaleData.dates.daysFormat.narrow;
      this.monthList_wide = this.sourceLocaleData.dates.monthsFormat.wide;
      this.monthList_abbreviated = this.sourceLocaleData.dates.monthsFormat.abbreviated;
      this.startDay = this.sourceLocaleData && this.sourceLocaleData.dates.firstDayOfWeek ? Number(this.sourceLocaleData.dates.firstDayOfWeek) : 0;
      const dateFormat = this.sourceLocaleData && this.sourceLocaleData.dates.dateFormats.short ? this.sourceLocaleData.dates.dateFormats.short : 'mm/dd/yyyy';
      this.yearAndMonthBtnDisplayOrder(dateFormat);
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startDay);
      console.log('firstDayOfWeek:' + this.startDay ,"userLocalechanged:" + locale);
    })  
  }

  initCalendar(){
    let nowDate = new Date()
    this.currentYear = nowDate.getFullYear();
    this.currentMonth = nowDate.getMonth() + 1;
    this.currentDate = nowDate.getDate();
  }

  yearAndMonthBtnDisplayOrder(dateFormat: string){
    if((dateFormat.indexOf('y') || dateFormat.indexOf('Y')) > (dateFormat.indexOf('m') || dateFormat.indexOf('M'))) {
      this.isYearShowAtLeft = false;
    } else {
      this.isYearShowAtLeft = true;
    }
  }

  preMonth() {
    if (this.currentMonth > 1) {
      this.currentMonth --;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startDay);
    } else if(this.currentMonth == 1) {
      this.currentYear --;
      this.currentMonth = 12;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startDay);
    }
  }

  nextMonth() {
    if (this.currentMonth < 12) {
      this.currentMonth ++;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startDay);
    } else if (this.currentMonth == 12) {
      this.currentYear ++;
      this.currentMonth = 1;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startDay);
    }
  }

  showCalendar() {
    this.isShowCalendar = true;
  }

  hideCalendar() {
    this.isShowCalendar = false;
  }
  
  clickDateHandel(dateItem: any, index: number) {
    let d = (dateItem.date && Number(dateItem.date)) || (this.currentDate && Number(this.currentDate));
    let totalMonthList = this.datePickerService.getTotalMonthList(this.currentYear, this.currentMonth, this.currentDate, this.startDay);
    let startAndEndDate: any[] = [];
    totalMonthList.forEach((item, index) => {
      if (item == 1){
        startAndEndDate.push(index);
      }
    })
    let currentMonthFirstDayIndex = startAndEndDate[0];
    let currentMonthLastDayIndex = startAndEndDate[1]
    if (!dateItem.isCurrentMonth) {
      if (index >= 0 && index <= currentMonthFirstDayIndex) {
        this.currentMonth --;
      } else if (index >= currentMonthLastDayIndex && index <= 41) {
        this.currentMonth ++;
      }
    } 
    let selected = `${this.currentMonth}\/${d}\/${this.currentYear}`;
    this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, selected, this.startDay);
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
    this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startDay);
    this.isShowMonthList = !this.isShowMonthList;
    this.isShowDateList = !this.isShowDateList;
  }

  clickYearHandel(year: number) {
    this.currentYear = year || this.currentYear;
    this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startDay);
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
    this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate, this.startDay);
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
