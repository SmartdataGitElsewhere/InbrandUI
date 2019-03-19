import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-message-list-box',
  templateUrl: './message-list-box.component.html',
  styleUrls: ['./message-list-box.component.css']
})
export class MessageListBoxComponent implements OnInit {
  @Input() msgList: any;
  constructor() { }

  close() {
    this.msgList = [];
   }
  ngOnInit() {}
  }
