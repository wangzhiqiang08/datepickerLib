import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePickerService } from './date-picker.service';
import { initDate } from './date-picker.model';

@Component({
  selector: 'vip-date-picker',
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
  constructor(private datePickerService: DatePickerService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initCalendar(initDate);
    this.selectedDate = null;
    this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
    this.monthStrList = initDate.monthStrList;
    this.yearStrList = this.datePickerService.getYearList(this.currentYear);
  }

  initCalendar(options:any){
    this.weekDayFormat = options.weekDayFormat;
    let nowDate = new Date()
    this.currentYear = nowDate.getFullYear();
    this.currentMonth = nowDate.getMonth() + 1;
    this.currentDate = nowDate.getDate();
  }

  preMonth() {
    if (this.currentMonth > 1) {
      this.currentMonth --;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
    } else if(this.currentMonth == 1) {
      this.currentYear --;
      this.currentMonth = 12;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
    }
  }

  nextMonth() {
    if (this.currentMonth < 12) {
      this.currentMonth ++;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
    } else if (this.currentMonth == 12) {
      this.currentYear ++;
      this.currentMonth = 1;
      this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
    }
  }
  
  getDateDidplayFormat() {
    if(this.selectedDate) {
      let selected: any = this.selectedDate && this.selectedDate.split("/");
      return `${selected[0]}\/${selected[1]}\/${selected[2]}`;
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
    this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, selected);
    this.selectedDate = selected;
    this.isShowCalendar = false;
  }

  showMonthList() {
    this.isShowMonthList = !this.isShowMonthList;
    this.isShowDateList = !this.isShowDateList;
  }

  showYearList() {
    this.isShowYearList = !this.isShowYearList;
    this.isShowDateList = !this.isShowDateList;
  }

  clickMonthHandel(month: number){
    this.currentMonth = month || this.currentMonth;
    this.totalCurrentMonthDaysList = this.datePickerService.setEveryDateStatus(this.currentYear, this.currentMonth, this.currentDate, this.selectedDate);
    this.isShowMonthList = !this.isShowMonthList;
    this.isShowDateList = !this.isShowDateList;
  }

  clickYearHandel(year: number) {
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
      } else {
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
  }

}
