import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'src/app/shops/shops.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() shop: Shop;
}
