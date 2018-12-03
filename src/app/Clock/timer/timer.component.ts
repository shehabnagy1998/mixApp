import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @ViewChild('timer') btn: ElementRef;

  constructor(private title: Title, private route: ActivatedRoute, private rinder: Renderer2) { }

  ngOnInit() {
    this.route.data.subscribe(t => this.title.setTitle(t['title']));
  }

  sec = 0;
  min = 0;
  hor = 0;
  timeInter = interval(1000);
  sub;
  over: Element = document.getElementsByClassName('navbar')[0];
  flag = true;

  resetTimer = () => {
    this.btn.nativeElement.innerText = 'Start';
    this.rinder.setStyle(this.over, 'backgroundColor', '#007bff');
    this.hor = 0;
    this.min = 0;
    this.sec = 0;
    if (this.sub)
      this.sub.unsubscribe();
  };

  startTimer = () => {
    if (this.btn.nativeElement.innerText === 'Start') {
      this.btn.nativeElement.innerText = 'Pause';
      this.sub = this.timeInter.subscribe(d => this.decreas());
    } else {
      this.btn.nativeElement.innerText = 'Start';
      this.rinder.setStyle(this.over, 'backgroundColor', '#007bff');
      if (this.sub)
        this.sub.unsubscribe();
    }
  };

  decreas = () => {
    if (this.sec <= 0) {
      if (this.min <= 0) {
        if (this.hor <= 0) {
          new Audio('assets/beep.wav').play();
          navigator.vibrate(300);
          this.changeColor();
        } else {
          this.hor--;
          this.min = 59;
        }
      } else {
        this.min--;
        this.sec = 59;
      }
    } else {
      this.sec--; 
    }
  };

  changeColor = () => {
    if (this.flag) {
      this.rinder.setStyle(this.over, 'backgroundColor', '#0052aa');
      this.flag = !this.flag;
    } else {
      this.rinder.setStyle(this.over, 'backgroundColor', '#007bff');
      this.flag = !this.flag;
    }
  };

}
