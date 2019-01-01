import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  address = "Roxas Ave Corner Roces St., Diliman, Quezon City, Metro Manila";
  location: {lat: number, lng: number};
  loading: boolean;

  constructor(
   
  ) {}

  ngOnInit() {
  
  }

}
