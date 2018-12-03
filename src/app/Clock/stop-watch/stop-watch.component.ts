import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { interval } from 'rxjs';


@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.css']
})
export class StopWatchComponent implements OnInit {

  constructor(private title: Title, private route: ActivatedRoute, private render: Renderer2) { }

  @ViewChild('starting') btn: ElementRef;

  hor = 0;
  min = 0;
  sec = 0;
  mili = 0;
  inter = interval(10);
  sub;

  ngOnInit() {
    this.route.data.subscribe(t => this.title.setTitle(t['title']));
  }

  reset = () => {
    if (this.sub)
      this.sub.unsubscribe();
    this.hor = 0;
    this.min = 0;
    this.sec = 0;
    this.mili = 0;
    this.btn.nativeElement.innerText = 'Start';
    this.render.setStyle(document.getElementsByClassName('navbar')[0], 'animation', 'none');
  };

  start = (e) => {
    if (e.target.innerText === 'Start') {
      e.target.innerText = 'Pause';
      new Audio('assets/beep.wav').play();
      navigator.vibrate(300);
      this.render.setStyle(document.getElementsByClassName('navbar')[0], 'animation', 'animate 3s infinite');
      this.sub = this.inter.subscribe(data => this.increase());
    } else {
      e.target.innerText = 'Start';
      this.render.setStyle(document.getElementsByClassName('navbar')[0], 'animation', 'none');
      if (this.sub)
        this.sub.unsubscribe();
    }
  };

  increase = () => {
    if (this.mili > 99) {
      this.mili = 0;
      if (this.sec > 59) {
        this.sec = 0;
        if (this.min > 59) {
          this.min = 0;
          this.hor++;
        } else {
          this.min++;
        }
      } else {
        this.sec++;
      }
    } else {
      this.mili++;
    }
  };

}
