import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerComponent } from './date-picker.component';



@NgModule({
  declarations: [
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    DatePickerComponent
  ]
})
export class DatePickerModule { }
