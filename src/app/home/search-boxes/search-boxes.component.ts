import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopsService, FilterKeys } from 'src/app/shops/shops.service';

@Component({
  selector: 'app-search-boxes',
  templateUrl: './search-boxes.component.html',
  styleUrls: ['./search-boxes.component.css']
})
export class HomeSearchComponent implements OnInit {
  filter: FormGroup;

  // @Output() nameFilterChange = new EventEmitter();
  // @Output() locationFilterChange = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private shopService: ShopsService) { }

  ngOnInit() {
    this.filter = this.fb.group({
      fcs: new FormControl(this.shopService.filter.fcs),
      location: new FormControl(this.shopService.filter.location)
    });

    // this.filter.get('fcs').valueChanges.subscribe((name) => {
    //   this.nameFilterChange.emit(name);
    // });

    // this.filter.get('location').valueChanges.subscribe((location) => {
    //   this.locationFilterChange.emit(location);
    // });
  }

  setFiltersAndRedirect() {
    this.shopService.setFilter(FilterKeys.Location, this.filter.get('location').value);
    this.shopService.setFilter(FilterKeys.FCS, this.filter.get('fcs').value);

    if (this.route.snapshot.url.toString() !== 'search') {
      this.router.navigate(['/search']);
    }
  }


}
