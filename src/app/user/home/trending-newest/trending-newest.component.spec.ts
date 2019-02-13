import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingNewestComponent } from './trending-newest.component';

describe('TrendingNewestComponent', () => {
  let component: TrendingNewestComponent;
  let fixture: ComponentFixture<TrendingNewestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingNewestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingNewestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
