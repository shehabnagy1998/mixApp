import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { trigger, query, stagger, animate, style, transition } from '@angular/animations';

const animationList = trigger('listAnimation', [
  transition('* => *', [
    query(':leave', [
      style({ transform: 'translateX(0%)'}),
      stagger(300, [
        animate('.5s linear', style({ transform: 'translateX(105%)' }))
      ])
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'translateX(-105%)' }),
      stagger(300, [
        animate('.5s linear', style({ transform: 'translateX(0%)' }))
      ])
    ], { optional: true })
  ])
]);

const listName = trigger('listName', [
  transition('* => *', [
    query(':leave', [
      style({ transform: 'translateX(0%)' }),
      animate('.5s linear', style({ transform: 'translateX(-105%)' }))
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'translateX(105%)' }),
      animate('.5s linear', style({ transform: 'translateX(0%)' }))
    ], { optional: true })
  ])
]);

interface lists {
  name: string,
  do: string[],
  check: boolean[]
}

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  animations: [animationList, listName]
})
export class ToDoComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  @ViewChild('btnCreate') btnCreate: ElementRef;
  @ViewChild('btnDelete') btnDelete: ElementRef;
  @ViewChild('text') textArea: ElementRef;
  selectedList = '';
  index = 0;

  modal = {
    title: 'title',
    body: 'body'
  };

  lists: lists[] = [
    {
      name: 'Love',
      do: ['do1', 'do2'],
      check: [true, false]
    },
    {
      name: 'Pray',
      do: ['do1', 'do2', 'do3'],
      check: [true, false, true]
    },
    {
      name: 'Eat',
      do: ['do1', 'do2', 'do3', 'do4'],
      check: [true, false, true, false]
    },
    {
      name: 'Sleep',
      do: ['do1'],
      check: [true]
    },
  ];

  ngOnInit() {
    this.checkDelete();

    $(document).ready(function () {
      $(document).on('click', '.listItem .slider', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
          $(this).children().replaceWith('<i class="fas fa-arrow-circle-up"></i>');
          $(this).parent().parent().next().slideToggle(1000);
        } else {
          $(this).children().replaceWith('<i class="fas fa-arrow-circle-down"></i>');
          $(this).parent().parent().next().slideToggle(1000);
        }
      });

      $(document).on('click', '.btnChanger', function () {
        $('main .listName').slideToggle();
      });
    })
  }

  checkDelete = () => {
    if (this.lists.length <= 0) {
      this.renderer.setAttribute(this.btnDelete.nativeElement, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(this.btnDelete.nativeElement, 'disabled');
    }
  };

  changing = (e) => {
    this.selectedList = e;
    let flag = false;
    for (var i = 0; i < this.lists.length; i++) {
      if (this.lists[i].name === this.selectedList) {
        flag = true;
        this.index = i;
        break;
      }
    }
    if (flag) {
      this.btnCreate.nativeElement.innerText = 'Edit';
    } else {
      this.btnCreate.nativeElement.innerText = 'Create';
    }
  };

  create = () => {
    let txt: string = this.btnCreate.nativeElement.innerText;
    if (txt == 'Edit') {
      this.textArea.nativeElement.innerText = '';
      let arr: string[] = this.lists[this.index].do,
        words = '';
      for (var i = 0; i < arr.length; i++) {
        words += arr[i] + '\n';
      }
      this.textArea.nativeElement.value = words.trim();
    } else {
      this.lists.push({ name: this.selectedList, do: [], check: [] });
      this.index = this.lists.length - 1;
    }
    this.selectedList = '';
    this.checkDelete();
  };

  delete = (li) => {
    if (confirm(`Do you want to delete "${li.name}" ?`)) {
      let i = this.lists.indexOf(li);
      this.lists.splice(i, 1);
      this.checkDelete();
    }
  };

  deleteAll = () => {
    if (confirm('Do you want to delete all lists ?')) {
      this.lists = [];
      this.checkDelete();
    }
  };

  done = () => {
    let txt: string = this.textArea.nativeElement.value;
    let arr: string[] = txt.split('\n');
    this.lists[this.index].do = [];
    this.lists[this.index].check = [];
    for (var i = 0; i < arr.length; i++) {
      this.lists[this.index].do.push(arr[i]);
      this.lists[this.index].check.push(false);
    }
    this.textArea.nativeElement.value = '';
  };

}
