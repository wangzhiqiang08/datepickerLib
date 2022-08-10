import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class DatePickerService {
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
    getTotalMonthList(year, month, day, startDay) {
        let dayLists = [];
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
        if (startDay == 5 || startDay == 6 || startDay == 0 || startDay == 1) {
            if (startWeekDay == startDay) {
                dayLists = [...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length)];
            }
            else if ((startWeekDay == 4 && startDay == 5) || (startWeekDay == 5 && startDay == 6) || (startWeekDay == 0 && startDay == 1) || (startWeekDay == 6 && startDay == 0)) {
                let previousMonthSlice = previousMonthList.slice(-6, previousMonthList.length);
                dayLists = [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
            }
            else {
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
                dayLists = [...previousMonthSlice, ...currentMonthList, ...nextMonthList.slice(0, 42 - currentMonthList.length - previousMonthSlice.length)];
            }
            return dayLists;
        }
        else {
            throw new SyntaxError("The key of 'startDay' 's value must be 0/1/5/6. ");
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
                let isSelected = (month === Number(selected[0])) && (date === Number(selected[1])) && (year === Number(selected[2])) && this.isCurrentMonthDate(totalDates, index);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGUtcGlja2VyL3NyYy9saWIvZGF0ZS1waWNrZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8saUJBQWlCO0lBRTVCLGdCQUFnQixDQUFDO0lBRWpCLFNBQVMsQ0FBQyxJQUFZLEVBQUMsS0FBYSxFQUFDLEdBQVc7UUFDOUMsSUFBSSxJQUFJLEdBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxLQUFLLEdBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQztRQUNoQyxJQUFJLFFBQVEsR0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQyxJQUFJLE9BQU8sR0FBQztZQUNOLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLEtBQUs7WUFDWixlQUFlLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDakQsZ0JBQWdCLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN4RCxZQUFZLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUNwRCxRQUFRLEVBQUUsUUFBUTtZQUNsQixHQUFHLEVBQUUsR0FBRztTQUNiLENBQUM7UUFDRixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBWSxFQUFDLEtBQWEsRUFBQyxHQUFXLEVBQUUsUUFBeUI7UUFDakYsSUFBSSxR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QixNQUFNOzRGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXZWVrRGF5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgY2FsY3VsYXRlKHllYXI6IG51bWJlcixtb250aDogbnVtYmVyLGRheTogbnVtYmVyKTogYW55IHtcbiAgICBsZXQgZGF0ZT15ZWFyKycvJyttb250aCsnLycrJzEnO1xuICAgIGxldCB3aGljaERheT1uZXcgRGF0ZShkYXRlKS5nZXREYXkoKTtcbiAgICBsZXQgbWVzc2FnZT17XG4gICAgICAgICAgeWVhcjogeWVhcixcbiAgICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgICAgY3VycmVudE1vbnRoTGVuOiBuZXcgRGF0ZSh5ZWFyLG1vbnRoLDApLmdldERhdGUoKSxcbiAgICAgICAgICBwcmV2aW91c01vbnRoTGVuOiBuZXcgRGF0ZSh5ZWFyLChtb250aCAtIDEpLDApLmdldERhdGUoKSxcbiAgICAgICAgICBuZXh0TW9udGhMZW46IG5ldyBEYXRlKHllYXIsKG1vbnRoICsgMSksMCkuZ2V0RGF0ZSgpLFxuICAgICAgICAgIHdoaWNoRGF5OiB3aGljaERheSxcbiAgICAgICAgICBkYXk6IGRheVxuICAgIH07XG4gICAgcmV0dXJuIG1lc3NhZ2U7XG4gIH1cblxuICBnZXRUb3RhbE1vbnRoTGlzdCh5ZWFyOiBudW1iZXIsbW9udGg6IG51bWJlcixkYXk6IG51bWJlciwgc3RhcnREYXk6IHN0cmluZyB8IG51bWJlcik6IEFycmF5PGFueT4ge1xuICAgIGxldCBkYXlMaXN0czphbnkgPSBbXTtcbiAgICBsZXQgY2FsY1Jlc3VsdCA9IHRoaXMuY2FsY3VsYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIGxldCBzdGFydFdlZWtEYXkgPSBjYWxjUmVzdWx0LndoaWNoRGF5O1xuICAgIGxldCBjdXJyZW50TW9udGhMaXN0ID0gdGhpcy5nZXRNb250aExpc3QoY2FsY1Jlc3VsdC5jdXJyZW50TW9udGhMZW4pO1xuICAgIGxldCBwcmV2aW91c01vbnRoTGlzdCA9IHRoaXMuZ2V0TW9udGhMaXN0KGNhbGNSZXN1bHQucHJldmlvdXNNb250aExlbik7XG4gICAgbGV0IG5leHRNb250aExpc3QgPSB0aGlzLmdldE1vbnRoTGlzdChjYWxjUmVzdWx0Lm5leHRNb250aExlbik7XG5cbiAgICAvLyBpZiAoc3RhcnREYXkgPT0gMSkge1xuICAgIC8vICAgaWYoc3RhcnRXZWVrRGF5ID09IDEpIHtcbiAgICAvLyAgICAgZGF5TGlzdHMgPSBbLi4uY3VycmVudE1vbnRoTGlzdCwgLi4ubmV4dE1vbnRoTGlzdC5zbGljZSgwLCA0MiAtIGN1cnJlbnRNb250aExpc3QubGVuZ3RoKV07XG4gICAgLy8gICB9IGVsc2UgaWYgKHN0YXJ0V2Vla0RheSA9PSAwKSB7XG4gICAgLy8gICAgIGxldCBwcmV2aW91c01vbnRoU2xpY2UgPSBwcmV2aW91c01vbnRoTGlzdC5zbGljZSgtNiwgcHJldmlvdXNNb250aExpc3QubGVuZ3RoKTtcbiAgICAvLyAgICAgZGF5TGlzdHMgPSAgWy4uLnByZXZpb3VzTW9udGhTbGljZSwgLi4uY3VycmVudE1vbnRoTGlzdCwgLi4ubmV4dE1vbnRoTGlzdC5zbGljZSgwLCA0MiAtIGN1cnJlbnRNb250aExpc3QubGVuZ3RoIC0gcHJldmlvdXNNb250aFNsaWNlLmxlbmd0aCldO1xuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgbGV0IHByZXZpb3VzTW9udGhTbGljZSA9IHByZXZpb3VzTW9udGhMaXN0LnNsaWNlKC1zdGFydFdlZWtEYXkrMSwgcHJldmlvdXNNb250aExpc3QubGVuZ3RoKTtcbiAgICAvLyAgICAgZGF5TGlzdHMgPSAgWy4uLnByZXZpb3VzTW9udGhTbGljZSwgLi4uY3VycmVudE1vbnRoTGlzdCwgLi4ubmV4dE1vbnRoTGlzdC5zbGljZSgwLCA0MiAtIGN1cnJlbnRNb250aExpc3QubGVuZ3RoIC0gcHJldmlvdXNNb250aFNsaWNlLmxlbmd0aCldO1xuICAgIC8vICAgfVxuICAgIC8vICAgcmV0dXJuIGRheUxpc3RzO1xuICAgIC8vIH0gZWxzZSBpZiAoc3RhcnREYXkgPT0gMCkge1xuICAgIC8vICAgaWYoc3RhcnRXZWVrRGF5ID09IDApIHtcbiAgICAvLyAgICAgZGF5TGlzdHMgPSBbLi4uY3VycmVudE1vbnRoTGlzdCwgLi4ubmV4dE1vbnRoTGlzdC5zbGljZSgwLCA0MiAtIGN1cnJlbnRNb250aExpc3QubGVuZ3RoKV07XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICBsZXQgcHJldmlvdXNNb250aFNsaWNlID0gcHJldmlvdXNNb250aExpc3Quc2xpY2UoLXN0YXJ0V2Vla0RheSwgcHJldmlvdXNNb250aExpc3QubGVuZ3RoKTtcbiAgICAvLyAgICAgZGF5TGlzdHMgPSAgWy4uLnByZXZpb3VzTW9udGhTbGljZSwgLi4uY3VycmVudE1vbnRoTGlzdCwgLi4ubmV4dE1vbnRoTGlzdC5zbGljZSgwLCA0MiAtIGN1cnJlbnRNb250aExpc3QubGVuZ3RoIC0gcHJldmlvdXNNb250aFNsaWNlLmxlbmd0aCldO1xuICAgIC8vICAgfVxuICAgIC8vICAgcmV0dXJuIGRheUxpc3RzO1xuICAgIC8vIH0gZWxzZSBcblxuICAgIGlmIChzdGFydERheSA9PSA1IHx8IHN0YXJ0RGF5ID09IDYgfHwgc3RhcnREYXkgPT0gMCB8fCBzdGFydERheSA9PSAxKXtcbiAgICAgIGlmIChzdGFydFdlZWtEYXkgPT0gIHN0YXJ0RGF5KSB7XG4gICAgICAgIGRheUxpc3RzID0gWy4uLmN1cnJlbnRNb250aExpc3QsIC4uLm5leHRNb250aExpc3Quc2xpY2UoMCwgNDIgLSBjdXJyZW50TW9udGhMaXN0Lmxlbmd0aCldO1xuICAgICAgfSBlbHNlIGlmICgoc3RhcnRXZWVrRGF5ID09IDQgJiYgc3RhcnREYXkgPT0gNSl8fCAoc3RhcnRXZWVrRGF5ID09IDUgJiYgc3RhcnREYXkgPT0gNil8fCAoc3RhcnRXZWVrRGF5ID09IDAgJiYgc3RhcnREYXkgPT0gMSkgfHwgKHN0YXJ0V2Vla0RheSA9PSA2ICYmIHN0YXJ0RGF5ID09IDApKSB7XG4gICAgICAgIGxldCBwcmV2aW91c01vbnRoU2xpY2UgPSBwcmV2aW91c01vbnRoTGlzdC5zbGljZSgtNiwgcHJldmlvdXNNb250aExpc3QubGVuZ3RoKTtcbiAgICAgICAgZGF5TGlzdHMgPSAgWy4uLnByZXZpb3VzTW9udGhTbGljZSwgLi4uY3VycmVudE1vbnRoTGlzdCwgLi4ubmV4dE1vbnRoTGlzdC5zbGljZSgwLCA0MiAtIGN1cnJlbnRNb250aExpc3QubGVuZ3RoIC0gcHJldmlvdXNNb250aFNsaWNlLmxlbmd0aCldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHNsaWNlU3RhcnQ7XG4gICAgICAgIHN3aXRjaCAoc3RhcnREYXkpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBzbGljZVN0YXJ0ID0gLXN0YXJ0V2Vla0RheTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHNsaWNlU3RhcnQgPSAtc3RhcnRXZWVrRGF5ICsgMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHNsaWNlU3RhcnQgPSAtKHN0YXJ0V2Vla0RheSArIDIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgc2xpY2VTdGFydCA9IC0oc3RhcnRXZWVrRGF5ICsgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByZXZpb3VzTW9udGhTbGljZSA9IHByZXZpb3VzTW9udGhMaXN0LnNsaWNlKHNsaWNlU3RhcnQsIHByZXZpb3VzTW9udGhMaXN0Lmxlbmd0aCk7XG4gICAgICAgIGRheUxpc3RzID0gIFsuLi5wcmV2aW91c01vbnRoU2xpY2UsIC4uLmN1cnJlbnRNb250aExpc3QsIC4uLm5leHRNb250aExpc3Quc2xpY2UoMCwgNDIgLSBjdXJyZW50TW9udGhMaXN0Lmxlbmd0aCAtIHByZXZpb3VzTW9udGhTbGljZS5sZW5ndGgpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXlMaXN0c1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJUaGUga2V5IG9mICdzdGFydERheScgJ3MgdmFsdWUgbXVzdCBiZSAwLzEvNS82LiBcIik7XG4gICAgfVxuICB9XG5cbiAgZ2V0TW9udGhMaXN0KG1vbnRoTGVuZ3RoOiBudW1iZXIpOiBBcnJheTxhbnk+IHtcbiAgICBsZXQgbGlzdD1bXTtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDw9IG1vbnRoTGVuZ3RoOyBpKyspIHtcbiAgICAgIGxpc3QucHVzaChpKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICBzZXRFdmVyeURhdGVTdGF0dXMoeWVhcjogbnVtYmVyLG1vbnRoOiBudW1iZXIsZGF5OiBudW1iZXIsIHNlbGVjdGVkRGF0ZTogc3RyaW5nIHwgbnVsbCwgc3RhcnRXaXRoU3VuZGF5T3JNb25kYXk6IHN0cmluZyB8IG51bWJlcik6IEFycmF5PG51bWJlcj4ge1xuICAgIGxldCB0b3RhbERhdGVzOiBhbnkgPSB0aGlzLmdldFRvdGFsTW9udGhMaXN0KHllYXIsIG1vbnRoLCBkYXksIHN0YXJ0V2l0aFN1bmRheU9yTW9uZGF5KTtcbiAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICBsZXQgY3VycmVudERhdGUgPSBub3cuZ2V0RGF0ZSgpO1xuICAgIGxldCBjdXJyZW50TW9udGggPSBub3cuZ2V0TW9udGgoKSArIDE7XG4gICAgbGV0IGN1cnJlbnRZZWFyID0gbm93LmdldEZ1bGxZZWFyKClcbiAgICBsZXQgc2VsZWN0ZWQ6IGFueSA9IHNlbGVjdGVkRGF0ZSAmJiBzZWxlY3RlZERhdGUuc3BsaXQoXCIvXCIpO1xuICAgIGlmICghc2VsZWN0ZWREYXRlKSB7XG4gICAgICB0b3RhbERhdGVzID0gdG90YWxEYXRlcy5tYXAoKGRhdGU6IGFueSkgPT4ge1xuICAgICAgICBsZXQgaXNUb2RheSA9IChkYXRlID09PSBjdXJyZW50RGF0ZSkgJiYgKG1vbnRoID09PSBjdXJyZW50TW9udGgpICYmICh5ZWFyID09PSBjdXJyZW50WWVhcik7XG4gICAgICAgIHJldHVybiB7ZGF0ZTogZGF0ZSwgaXNUb2RheTogaXNUb2RheSwgaXNTZWxlY3RlZDogZmFsc2UsIGlzQ3VycmVudE1vbnRoOiBudWxsfVxuICAgICAgfSlcbiAgICAgIHRvdGFsRGF0ZXMgPSB0aGlzLmZpbHRlckFuZFNldEN1cnJlbnRNb250aERhdGUodG90YWxEYXRlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvdGFsRGF0ZXMgPSB0b3RhbERhdGVzLm1hcCgoZGF0ZTogYW55LCBpbmRleDogYW55KSA9PiB7XG4gICAgICAgIGxldCBpc1RvZGF5ID0gKGRhdGUgPT09IGN1cnJlbnREYXRlKSAmJiAobW9udGggPT09IGN1cnJlbnRNb250aCkgJiYgKHllYXIgPT09IGN1cnJlbnRZZWFyKTtcbiAgICAgICAgbGV0IGlzU2VsZWN0ZWQgPSAobW9udGggPT09IE51bWJlcihzZWxlY3RlZFswXSkpICYmIChkYXRlID09PSBOdW1iZXIoc2VsZWN0ZWRbMV0pKSAmJiAoeWVhciA9PT0gTnVtYmVyKHNlbGVjdGVkWzJdKSkgJiYgdGhpcy5pc0N1cnJlbnRNb250aERhdGUodG90YWxEYXRlcywgaW5kZXgpO1xuICAgICAgICByZXR1cm4ge2RhdGU6IGRhdGUsIGlzVG9kYXk6IGlzVG9kYXksIGlzU2VsZWN0ZWQ6IGlzU2VsZWN0ZWQsIGlzQ3VycmVudE1vbnRoOiBudWxsfVxuICAgICAgfSlcbiAgICAgIHRvdGFsRGF0ZXMgPSB0aGlzLmZpbHRlckFuZFNldEN1cnJlbnRNb250aERhdGUodG90YWxEYXRlcyk7XG4gICAgfVxuICAgIHJldHVybiB0b3RhbERhdGVzO1xuICB9XG5cbiAgZmlsdGVyQW5kU2V0Q3VycmVudE1vbnRoRGF0ZSh0b3RhbERhdGVzOiBBcnJheTxudW1iZXI+KSB7XG4gICAgbGV0IGN1cnJlbnRNb250aFN0YXJ0OiBudW1iZXIsIGN1cnJlbnRNb250aEVuZDogbnVtYmVyLCBpbmNsdWRlczogYW55W10gPSBbXTtcbiAgICB0b3RhbERhdGVzLmZvckVhY2goKGVsOmFueSwgaTogYW55KSA9PiAoZWwuZGF0ZSA9PT0gMSB8fCBlbC5kYXRlID09PSBcIjFcIikgJiYgaW5jbHVkZXMucHVzaChpKSk7XG4gICAgaWYgKGluY2x1ZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGN1cnJlbnRNb250aFN0YXJ0ID0gaW5jbHVkZXNbMF07XG4gICAgICBjdXJyZW50TW9udGhFbmQgPSBpbmNsdWRlc1sxXTtcbiAgICAgIHRvdGFsRGF0ZXMubWFwKChkYXRlOiBhbnksIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA+PSBjdXJyZW50TW9udGhTdGFydCAmJiBpbmRleCA8IGN1cnJlbnRNb250aEVuZCkge1xuICAgICAgICAgIGRhdGUuaXNDdXJyZW50TW9udGggPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGUuaXNDdXJyZW50TW9udGggPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiB0b3RhbERhdGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdG90YWxEYXRlcztcbiAgICB9XG4gIH1cbiAgXG4gIGlzQ3VycmVudE1vbnRoRGF0ZSh0b3RhbERhdGVzOiBBcnJheTxudW1iZXI+LCBpbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGN1cnJlbnRNb250aFN0YXJ0OiBudW1iZXIsIGN1cnJlbnRNb250aEVuZDogbnVtYmVyLCBpbmNsdWRlczogYW55W10gPSBbXTtcbiAgICB0b3RhbERhdGVzLmZvckVhY2goKGVsOmFueSwgaTogYW55KSA9PiAoZWwgPT09IDEgfHwgZWwgPT09IFwiMVwiKSAmJiBpbmNsdWRlcy5wdXNoKGkpKTtcbiAgICBjdXJyZW50TW9udGhTdGFydCA9IGluY2x1ZGVzWzBdO1xuICAgIGN1cnJlbnRNb250aEVuZCA9IGluY2x1ZGVzWzFdO1xuICAgIHJldHVybiBpbmRleCA+PSBjdXJyZW50TW9udGhTdGFydCAmJiBpbmRleCA8IGN1cnJlbnRNb250aEVuZDtcbiAgfVxuXG4gIGdldFllYXJMaXN0KGN1cnJlbnRZZWFyOiBudW1iZXIpIHtcbiAgICBsZXQgeWVhciA9IGN1cnJlbnRZZWFyO1xuICAgIGxldCBlbmROdW1iZXIgPSB5ZWFyLnRvU3RyaW5nKCkudHJpbSgpLnNsaWNlKC0xKTtcbiAgICBsZXQgbGlzdDogYW55ID0gW107XG4gICAgaWYgKGVuZE51bWJlciA9PSAnMCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSBjdXJyZW50WWVhcjsgaSA8IChjdXJyZW50WWVhcisxMCk7IGkrKykge1xuICAgICAgICBsaXN0LnB1c2goTnVtYmVyKGkpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGN1cnJlbnRZZWFyIC0tO1xuICAgICAgICBpZiAoY3VycmVudFllYXIgJSAxMCA9PSAwKXtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IGN1cnJlbnRZZWFyOyBpIDwgKGN1cnJlbnRZZWFyKzEwKTsgaSsrKSB7XG4gICAgICAgIGxpc3QucHVzaChOdW1iZXIoaSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGlzdDtcbiAgICBcbiAgfVxufVxuIl19