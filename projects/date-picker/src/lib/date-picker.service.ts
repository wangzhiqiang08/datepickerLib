import { WeekDay } from '@angular/common';
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

  getTotalMonthList(year: number,month: number,day: number, startDay: string | number): Array<any> {
    let dayLists:any = [];
    let calcResult = this.calculate(year, month, day);
    let startWeekDay = calcResult.whichDay;
    let currentMonthList = this.getMonthList(calcResult.currentMonthLen);
    let previousMonthList = this.getMonthList(calcResult.previousMonthLen);
    let nextMonthList = this.getMonthList(calcResult.nextMonthLen);

    // if (startDay == 1) {
    //   if(startWeekDay == 1) {
    //     dayLists = [...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length)];
    //   } else if (startWeekDay == 0) {
    //     let previousMonthSlice = previousMonthList.slice(-6, previousMonthList.length);
    //     dayLists =  [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
    //   } else {
    //     let previousMonthSlice = previousMonthList.slice(-startWeekDay+1, previousMonthList.length);
    //     dayLists =  [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
    //   }
    //   return dayLists;
    // } else if (startDay == 0) {
    //   if(startWeekDay == 0) {
    //     dayLists = [...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length)];
    //   } else {
    //     let previousMonthSlice = previousMonthList.slice(-startWeekDay, previousMonthList.length);
    //     dayLists =  [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
    //   }
    //   return dayLists;
    // } else 

    if (startDay == 5 || startDay == 6 || startDay == 0 || startDay == 1){
      if (startWeekDay ==  startDay) {
        dayLists = [...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length)];
      } else if ((startWeekDay == 4 && startDay == 5)|| (startWeekDay == 5 && startDay == 6)|| (startWeekDay == 0 && startDay == 1) || (startWeekDay == 6 && startDay == 0)) {
        let previousMonthSlice = previousMonthList.slice(-6, previousMonthList.length);
        dayLists =  [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
      } else {
        let sliceStart;
        switch (startDay) {
          case 0:
            sliceStart = -startWeekDay;
            break;
          case 1:
            sliceStart = -startWeekDay + 1;
            break;
          case 5:
            sliceStart = -(startWeekDay + 2);
            break;
          case 6:
            sliceStart = -(startWeekDay + 1);
            break;
          default:
            break;
        }
        let previousMonthSlice = previousMonthList.slice(sliceStart, previousMonthList.length);
        dayLists =  [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
      }
      return dayLists
    } else {
      throw new SyntaxError("The key of 'startDay' 's value must be 0/1/5/6. ");
    }
  }

  getMonthList(monthLength: number): Array<any> {
    let list=[];
    for(let i = 1; i <= monthLength; i++) {
      list.push(i);
    }
    return list;
  }

  setEveryDateStatus(year: number,month: number,day: number, selectedDate: string | null, startWithSundayOrMonday: string | number): Array<number> {
    let totalDates: any = this.getTotalMonthList(year, month, day, startWithSundayOrMonday);
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
        let isSelected = (month === Number(selected[0])) && (date === Number(selected[1])) && (year === Number(selected[2])) && this.isCurrentMonthDate(totalDates, index+1);
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
  
  isCurrentMonthDate(totalDates: Array<number>, index: number) {
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
