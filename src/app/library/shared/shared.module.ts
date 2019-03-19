import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomvalidatorsComponent } from './components/customvalidators/customvalidators.component';


// AoT requires an exported function for factories

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CustomvalidatorsComponent],
  exports: [],
  providers: []
})
export class SharedModule { }
