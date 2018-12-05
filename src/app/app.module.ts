import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClockComponent } from './Clock/clock/clock.component';
import { StopWatchComponent } from './Clock/stop-watch/stop-watch.component';
import { TimerComponent } from './Clock/timer/timer.component';
import { ToDoComponent } from './To-Do/to-do.component';


@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    StopWatchComponent,
    TimerComponent,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
