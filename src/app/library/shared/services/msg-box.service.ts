import { Injectable } from '@angular/core';

@Injectable()
export class MsgBoxService {

  Msg: string;
  MsgType: string;
  Show: boolean;
  confirmShow: boolean;
  constructor() { }
  ShowMsg(msg: string, msgType: string) {
    this.Msg = msg;
    this.MsgType = msgType;
    this.Show = true;
  }

  close() {
    this.MsgType = null;
    this.Msg = null;
    this.Show = false;
  }

  showConfirmation(msg: string) {
    this.Msg = msg;
    this.confirmShow = true;
  }
  confirmOK() {
    this.confirmShow = false;
    this.Msg = null;
    return true;
  }
  confirmCancel() {
    this.confirmShow = false;
    this.Msg = null;
    return false;
  }

}
