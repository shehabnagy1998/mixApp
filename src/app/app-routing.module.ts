import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClockComponent } from './Clock/clock/clock.component';
import { StopWatchComponent } from './Clock/stop-watch/stop-watch.component';
import { TimerComponent } from './Clock/timer/timer.component';

const routes: Routes = [
  { path: 'clock', redirectTo: 'clock/timenow', data: { title: 'Time Now' } },
  { path: 'clock/timenow', component: ClockComponent, data: { title: 'Time Now' } },
  { path: 'clock/stopwatch', component: StopWatchComponent, data: {title: 'Stop Watch'} },
  { path: 'clock/timer', component: TimerComponent, data: {title: 'Timer'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
