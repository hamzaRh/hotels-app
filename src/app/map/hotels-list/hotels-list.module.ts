import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsListComponent } from './hotels-list.component';



@NgModule({
  declarations: [HotelsListComponent],
  imports: [
    CommonModule
  ],
  exports: [HotelsListComponent]
})
export class HotelsListModule { }
