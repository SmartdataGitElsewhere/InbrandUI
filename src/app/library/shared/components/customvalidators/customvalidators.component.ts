import { Component, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customvalidators',
  templateUrl: './customvalidators.component.html',
  styleUrls: ['./customvalidators.component.css']
})
export class CustomvalidatorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  static patternValidator(control: FormControl) {
    const EmailRegex: any = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!EmailRegex.test(control.value)) {
        return { ValidateEmail: true };
    };
    return null;
  }

  static ConfirmPassword(control: FormControl) {
    if (control.parent != undefined) {
        const Password = control.parent.controls["Password"].value;
        const ConfirmPassword = control.parent.controls["ConfirmPassword"].value;
        if (Password != undefined && (ConfirmPassword != undefined && ConfirmPassword != '')) {
            if (Password != ConfirmPassword) {
                return { ComparePassword: true }
            }
        }
        return null;
    }
    return null;
}

}
