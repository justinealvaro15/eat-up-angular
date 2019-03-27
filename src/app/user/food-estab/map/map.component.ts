import { Component, OnInit, Input } from '@angular/core';
import { Shop } from './../../shops/shops.model';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { icon, marker, polyline, latLng, tileLayer } from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  
  //marker for food-estab
  food_estab: any;
  options: any;
  
  @Input() shop: Shop;

  constructor() { 
  }
  
  ngOnInit() {

    this.food_estab = marker([this.shop.coordinates.lat, this.shop.coordinates.long], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    }); 

  	console.log(this.shop.coordinates.long);
    console.log(this.shop.coordinates.lat);
    this.options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }),
      this.food_estab,

    ],
    zoom: 16,
    minZoom: 14,
    center: latLng([ this.shop.coordinates.lat, this.shop.coordinates.long]),
    maxBounds: [ [14.663444, 121.055124],
                [14.645623, 121.076978] ]
  };


    
  }

  

 

}
