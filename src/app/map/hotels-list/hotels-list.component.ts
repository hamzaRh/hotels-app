import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IHotel } from 'src/app/models/models';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss']
})
export class HotelsListComponent {

  @Input() hotelsList: IHotel[];
  @Output() selectHotel = new EventEmitter<number>();

  select(index: number) {
    this.selectHotel.emit(index);
  }

}
