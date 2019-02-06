import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from './location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  constructor(
  	private http: HttpClient
  ) { }

  private location: Location[] = [];
  filterChanged = new EventEmitter();

  getCoordinates() {
  	return this.http.get<Location[]>('http://localhost:3000/api/search');
  }
}
