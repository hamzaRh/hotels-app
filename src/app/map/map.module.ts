import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map.component';
import { HotelsListModule } from './hotels-list/hotels-list.module';


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HotelsListModule
  ],
  exports: [MapComponent]
})
export class MapModule { }
