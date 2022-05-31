import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  constructor() { }

  calculate(year: number,month: number,day: number): any {
    let date=year+'/'+month+'/'+'1';
    let whichDay=new Date(date).getDay();
    let message={
          year: year,
          month: month,
          currentMonthLen: new Date(year,month,0).getDate(),
          previousMonthLen: new Date(year,(month - 1),0).getDate(),
          nextMonthLen: new Date(year,(month + 1),0).getDate(),
          whichDay: whichDay,
          day: day
    };
    return message;
  }

  getTotalMonthList(year: number,month: number,day: number): Array<any> {
    let dayLists:any = [];
    let calcResult = this.calculate(year, month, day);
    let startWeekDay = calcResult.whichDay;
    let currentMonthList = this.getMonthList(calcResult.currentMonthLen);
    let previousMonthList = this.getMonthList(calcResult.previousMonthLen);
    let nextMonthList = this.getMonthList(calcResult.nextMonthLen);

    if(startWeekDay == 0) {
      dayLists = [...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length)];
    } else {
      let previousMonthSlice = previousMonthList.slice(-startWeekDay, previousMonthList.length);
      dayLists =  [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
    }
    return dayLists;
  }

  getMonthList(monthLength: number): Array<any> {
    let list=[];
    for(let i = 1; i <= monthLength; i++) {
      list.push(i);
    }
    return list;
  }

  setEveryDateStatus(year: number,month: number,day: number, selectedDate: string | null): Array<number> {
    let totalDates: any = this.getTotalMonthList(year, month, day);
    let now = new Date();
    let currentDate = now.getDate();
    let currentMonth = now.getMonth() + 1;
    let currentYear = now.getFullYear()
    let selected: any = selectedDate && selectedDate.split("/");
    if (!selectedDate) {
      totalDates = totalDates.map((date: any) => {
        let isToday = (date === currentDate) && (month === currentMonth) && (year === currentYear);
        return {date: date, isToday: isToday, isSelected: false, isCurrentMonth: null}
      })
      totalDates = this.filterAndSetCurrentMonthDate(totalDates);
    } else {
      totalDates = totalDates.map((date: any, index: any) => {
        let isToday = (date === currentDate) && (month === currentMonth) && (year === currentYear);
        let isSelected = (date === Number(selected[0])) && (month === Number(selected[1])) && (year === Number(selected[2])) && this.isCurrentMontDate(totalDates, index+1);
        return {date: date, isToday: isToday, isSelected: isSelected, isCurrentMonth: null}
      })
      totalDates = this.filterAndSetCurrentMonthDate(totalDates);
    }
    return totalDates;
  }

  filterAndSetCurrentMonthDate(totalDates: Array<number>) {
    let currentMonthStart: number, currentMonthEnd: number, includes: any[] = [];
    totalDates.forEach((el:any, i: any) => (el.date === 1 || el.date === "1") && includes.push(i));
    if (includes.length > 0) {
      currentMonthStart = includes[0];
      currentMonthEnd = includes[1];
      totalDates.map((date: any, index) => {
        if (index >= currentMonthStart && index < currentMonthEnd) {
          date.isCurrentMonth = true;
        } else {
          date.isCurrentMonth = false;
        }
      })
      return totalDates;
    } else {
      return totalDates;
    }
  }
  
  isCurrentMontDate(totalDates: Array<number>, index: number) {
    let currentMonthStart: number, currentMonthEnd: number, includes: any[] = [];
    totalDates.forEach((el:any, i: any) => (el === 1 || el === "1") && includes.push(i));
    currentMonthStart = includes[0];
    currentMonthEnd = includes[1];
    return index >= currentMonthStart && index < currentMonthEnd;
  }

  getYearList(currentYear: number) {
    let year = currentYear;
    let endNumber = year.toString().trim().slice(-1);
    let list: any = [];
    if (endNumber == '0') {
      for (let i = currentYear; i < (currentYear+10); i++) {
        list.push(Number(i));
      }
    } else {
      for (let i = 0; i < 10; i++) {
        currentYear --;
        if (currentYear % 10 == 0){
          break;
        }
      }
      for (let i = currentYear; i < (currentYear+10); i++) {
        list.push(Number(i));
      }
    }
    return list;
    
  }
}
