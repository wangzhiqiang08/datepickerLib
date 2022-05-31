import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerComponent } from './date-picker.component';
import { ClickOutsideDirective } from './listener-picker.directive';



@NgModule({
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
})
export class DatePickerModule { }
