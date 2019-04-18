import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFoodEstabComponent } from './admin-food-estab.component';

describe('AdminFoodEstabComponent', () => {
  let component: AdminFoodEstabComponent;
  let fixture: ComponentFixture<AdminFoodEstabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFoodEstabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFoodEstabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
