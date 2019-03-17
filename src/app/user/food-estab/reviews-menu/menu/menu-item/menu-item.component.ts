import { Component, OnInit, Input } from '@angular/core';
import { Consumables, BrandedConsumables } from 'app/user/shops/shops.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() title: string;
  @Input() consumables: Consumables[] | BrandedConsumables[];

  constructor() { }

  ngOnInit() {
  }

  getTooltipText(consumable: Consumables): string {
    return consumable && consumable.username ? `Last edit by: ${consumable.username}` : null;
  }

}
