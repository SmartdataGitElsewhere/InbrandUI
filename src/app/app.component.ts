import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>
  <app-loader></app-loader>
  <app-msg-box></app-msg-box>
  <app-confirm-box></app-confirm-box>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
