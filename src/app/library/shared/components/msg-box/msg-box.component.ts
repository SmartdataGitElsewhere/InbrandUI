import { Component, OnInit } from '@angular/core';
import { MsgBoxService } from '../../services/msg-box.service';
@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styleUrls: ['./msg-box.component.css']
})
export class MsgBoxComponent implements OnInit {

  constructor(public msgBoxService: MsgBoxService) { }

  ngOnInit() {
    this.msgBoxService.Show = false;
  }
  close() {
    this.msgBoxService.close();
  }
}
