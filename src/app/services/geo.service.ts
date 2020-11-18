import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  private searchValue: BehaviorSubject<string>;
  public searchValueObservabe: Observable<string>;

  constructor(private http: HttpClient) {
    this.searchValue = new BehaviorSubject<string>('');
    this.searchValueObservabe = this.searchValue.asObservable();
  }

  emitSearchValue(value: string): void {
    this.searchValue.next(value);

  }

  getSearchValue(): Observable<string> {
    return this.searchValueObservabe;
  }

  getDataByCityName(value: string): Observable<Object> {
    return this.http.get(`http://api.geonames.org/searchJSON?q=${value}&maxRows=1&username=hamzarh`);
  }

  getHotelsByPlaceName(lat: number, lng: number): Observable<Object> {
    return this.http.get(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${lat},${lng}&q=hotels&apiKey=wf4KKHlN3-hMVw9lpyXdIEt88ExwjHRws6cgv3mTTcw`);
  }
}
