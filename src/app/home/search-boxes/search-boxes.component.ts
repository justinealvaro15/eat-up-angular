import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-boxes',
  templateUrl: './search-boxes.component.html',
  styleUrls: ['./search-boxes.component.css']
})
export class HomeSearchComponent implements OnInit {
  filter: FormGroup;

  @Output() nameFilterChange = new EventEmitter();
  @Output() locationFilterChange = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.filter = this.fb.group({
      name: new FormControl(),
      location: new FormControl
    });

    this.filter.get('name').valueChanges.subscribe((name) => {
      this.nameFilterChange.emit(name);
    });

    this.filter.get('location').valueChanges.subscribe((location) => {
      this.locationFilterChange.emit(location);
    });
  }


}
