import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public initDate = {
    weekDayFormat:['S','M','T','W','T','F','S'],
    monthStrList:[
      {short:'Jan',long: 'January'},
      {short:'Feb',long: 'February'},
      {short:'Mar',long: 'March'},
      {short:'Apr',long: 'April'},
      {short:'May',long: 'May'},
      {short:'Jun',long: 'June'},
      {short:'Jul',long: 'July'},
      {short:'Aug',long: 'August'},
      {short:'Sep',long: 'September'},
      {short:'Oct',long: 'October'},
      {short:'Nov',long: 'November'},
      {short:'Dec',long: 'December'}
    ],
    selectedFormat: "dd/mm/yyyy"
  }
  title = 'sample';
  
  getDate(e: any){
    console.log(e);
  }
  
}
