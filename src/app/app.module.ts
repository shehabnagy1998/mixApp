import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClockComponent } from './Clock/clock/clock.component';
import { StopWatchComponent } from './Clock/stop-watch/stop-watch.component';
import { TimerComponent } from './Clock/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    StopWatchComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
