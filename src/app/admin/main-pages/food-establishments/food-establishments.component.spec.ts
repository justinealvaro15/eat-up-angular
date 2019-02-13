import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodEstablishmentsComponent } from './food-establishments.component';

describe('FoodEstablishmentsComponent', () => {
  let component: FoodEstablishmentsComponent;
  let fixture: ComponentFixture<FoodEstablishmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodEstablishmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodEstablishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
