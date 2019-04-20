import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuItemComponent } from './admin-menu-item.component';

describe('AdminMenuItemComponent', () => {
  let component: AdminMenuItemComponent;
  let fixture: ComponentFixture<AdminMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
