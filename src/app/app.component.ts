import { Component, ElementRef, Renderer2 } from '@angular/core';
import { trigger, transition, animate, style, group, query } from '@angular/animations';
import 'bootstrap';

const animat = trigger('routeAnimation', [
  transition('*<=>*', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ opacity: 1 }),
        animate('.5s linear', style({ opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0 }),
        animate('.5s linear', style({ opacity: 1 }))
      ], { optional: true })
    ])
  ])
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [animat]
})
export class AppComponent {
  title = 'Ang-Pro';
  foot = false;

  constructor(private renderer: Renderer2) { }

  footerExpand = (footer: ElementRef) => {
    if (!this.foot) {
      this.renderer.setStyle(footer, 'transform', 'translate(10%)');
      this.foot = !this.foot;
    } else {
      this.renderer.setStyle(footer, 'transform', 'translate(-95%)');
      this.foot = !this.foot;
    }
  };
}
