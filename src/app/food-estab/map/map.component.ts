import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GeocodeService } from './geocode.service';

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
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.showLocation();
  }

  showLocation() {
    this.addressToCoordinates();
  }

  addressToCoordinates() {
    this.loading = true;
    this.geocodeService.geocodeAddress(this.address)
    .subscribe(
      location => {
        this.location = location;
        this.loading = false;
        this.ref.detectChanges();
      }
    );
  }
}
