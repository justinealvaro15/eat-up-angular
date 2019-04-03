import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCardAdminComponent } from './shop-card-admin.component';

describe('ShopCardAdminComponent', () => {
  let component: ShopCardAdminComponent;
  let fixture: ComponentFixture<ShopCardAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCardAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
