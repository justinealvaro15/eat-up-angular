import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'app/user/shops/shops.model';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() shop: Shop;
}
