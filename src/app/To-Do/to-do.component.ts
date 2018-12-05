import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  @ViewChild('btn') btn: ElementRef;
  selectedList = '';

  lists = [
    {
      name: 'Create',
      do: ['do1', 'do2'],
      check: [true, false]
    },
    {
      name: 'Edit',
      do: ['do1', 'do2', 'do3'],
      check: [true, false, true]
    },
    {
      name: 'Modify',
      do: ['do1', 'do2', 'do3', 'do4'],
      check: [true, false, true, false]
    },
    {
      name: 'Eat',
      do: ['do1'],
      check: [true]
    },
  ];

  ngOnInit() {
  }

  changing = (e) => {
    this.selectedList = e;
    let flag = false;
    for (var i = 0; i < this.lists.length; i++) {
      if (this.lists[i].name === this.selectedList) {
        flag = true;
        break;
      }
    }
    if (flag)
      this.btn.nativeElement.innerText = 'Edit';
    else
      this.btn.nativeElement.innerText = 'Create';
    //this.selectedList = e.target.value();
    
  };

}
