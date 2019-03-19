import { Component, OnInit } from '@angular/core';
import { ConfirmBoxService } from '../../services/confirm-box.service';
@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent implements OnInit {
  constructor(public confirmService: ConfirmBoxService) { }

  ngOnInit() {
    this.confirmService.show = false;
  }
  OK() {
    debugger
    this.confirmService.callComponentMethod();
    this.confirmService.show = false;
  }
  Cancel() {
    this.confirmService.show = false;
  }

}
