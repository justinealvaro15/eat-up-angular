import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Options } from 'select2';
import {ViewEncapsulation} from '@angular/core';
import { UsersService, FilterKeys } from './../users.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  filter: FormGroup;

  constructor( private fb: FormBuilder, private userService: UsersService) { }

  ngOnInit() {
     this.filter = this.fb.group({
      name_or_id: new FormControl(this.userService.filter.name_or_id)
    });
  }

  setFilters(){
    console.log(this.filter.get('name_or_id').value);

    this.userService.setFilter(FilterKeys.Name_Or_Id, this.filter.get('name_or_id').value);
  }
}
