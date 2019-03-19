import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  constructor() { }
  public loaderShow = false;
  Start() {
    this.loaderShow = true;
    console.log('Loader Start');
  }
  Stop() {
    this.loaderShow = false;
    console.log('Loader Start');
  }

}
