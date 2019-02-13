import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsMenuComponent } from './reviews-menu.component';

describe('ReviewsMenuComponent', () => {
  let component: ReviewsMenuComponent;
  let fixture: ComponentFixture<ReviewsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
