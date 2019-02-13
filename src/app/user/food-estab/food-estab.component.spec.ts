import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodEstabComponent } from './food-estab.component';

describe('FoodEstabComponent', () => {
  let component: FoodEstabComponent;
  let fixture: ComponentFixture<FoodEstabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodEstabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodEstabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
