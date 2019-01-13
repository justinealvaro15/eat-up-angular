import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'src/app/shops/shops.model';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { icon, marker, polyline, latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  @Input() shop: Shop;

  constructor() { 
  }
  
  ngOnInit() {
  	console.log(this.shop.coordinates.long);
  	console.log(this.shop.coordinates.lat);
  }


   //marker for food-estab
/*  
  food_estab = marker([this.shop.coordinates.lat, this.shop.coordinates.long], {
  	icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  }); 
*/
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
     
    ],
    zoom: 15,
    center: latLng([ 14.654409, 121.068691])
  };

  


  

 

}
