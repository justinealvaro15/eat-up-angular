import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMenuItemComponent } from './add-menu-item.component';
import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';

describe('AddMenuItemComponent', () => {
  let component: AddMenuItemComponent;
  let fixture: ComponentFixture<AddMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
