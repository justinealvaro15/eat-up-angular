import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'src/app/shops/shops.model';
import * as moment from 'moment';

@Component({
  selector: 'app-addtl-details',
  templateUrl: './addtl-details.component.html',
  styleUrls: ['./addtl-details.component.css']
})
export class AddtlDetailsComponent implements OnInit {
  panelOpenState = false;
  constructor() { }

  ngOnInit() {
  }

  @Input() shop: Shop;

  displayHours(): string {
    const opening = moment().hour(this.shop.hours.opening.hour).minute(this.shop.hours.opening.minute).format("h:mm A");
    const closing = moment().hour(this.shop.hours.closing.hour).minute(this.shop.hours.closing.minute).format("h:mm A");

    return `${opening} to ${closing}`;
  }

  displayDays(): string{
    
  }
}
