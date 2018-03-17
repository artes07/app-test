import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { TimerButtonsComponent } from './timer/timer-buttons.component';
import {TimerService} from './timer.service';



@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimerButtonsComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
