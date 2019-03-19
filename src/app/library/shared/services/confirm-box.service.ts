import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ConfirmBoxService {
  show: boolean;
  constructor() { }
  private componentMethodCallSource = new Subject<any>();
  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  // Service message commands
  callComponentMethod() {
    this.componentMethodCallSource.next();
  }
  Confirm() {
    this.show = true;
  }
}
