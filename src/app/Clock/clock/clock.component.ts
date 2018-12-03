import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor(private title: Title, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe(data => this.title.setTitle(data['title']));
    let timeInterval = interval(1000);
    timeInterval.subscribe(d => this.time = Date.now());

    (function () {
      let sec = $('.second'),
        prog = $('.progress-bar');
      window.setInterval(() => {
        prog.css({ width: `${(sec.text()/60)*100}%`});
      }, 1000);
    }());

  }

  time = Date.now();

}
