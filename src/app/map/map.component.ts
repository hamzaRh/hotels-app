import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ICityResults, IHotelsResults, IHotel, IMarker, IPosition } from '../models/models';
import { GeoService } from '../services/geo.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnDestroy {

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @Output() isInputDisabled = new EventEmitter<boolean>();

  private subscriptions: Subscription[] = [];
  markers: IMarker[] = [];
  detailedList: any[] = [];
  center: IPosition;
  results: ICityResults;
  zoom = 14;

  constructor(private geoService: GeoService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.geoService.getSearchValue().pipe(
        tap(serachValue => !!serachValue ? this.updateMap(serachValue) : null)
      ).subscribe()
    )
  }

  updateMap(value: string): void {
    this.subscriptions.push(
      this.geoService.getDataByCityName(value).pipe(
        switchMap((results: ICityResults) => {
          this.results = results;
          if (this.results.totalResultsCount > 0) {
            const { lat, lng } = this.results.geonames[0];
            this.center = {
              lat: parseFloat(lat),
              lng: parseFloat(lng)
            }
            return this.geoService.getHotelsByPlaceName(parseFloat(lat), parseFloat(lng))
          }
          return [];
        }),
        tap((results: IHotelsResults) => {
          const hotelsList = results.results;
          this.addList(hotelsList);
        })
      ).subscribe()
    );
  }

  addList(hotelsList: IHotel[]): void {
    Array.from(hotelsList).forEach((hotel) => {
      const { position, category } = hotel;
      if (position && category === 'hotel') {
        const [lat, lng] = position;
        const {title, vinicity} = hotel;
        this.detailedList.push({title: title, vinicity: vinicity})
        this.markers.push({
          position: {
            lat: lat,
            lng: lng
          },
          options: {
            icon: '../../assets/images/home.svg'
          }
        })
      }
    });
  }

  select(index: number) {
    const marker = this.markers[index];
    this.center = marker.position;
    this.zoom = 18;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe;
    })
  }
}
