import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddMenuItemComponent } from './admin-add-menu-item.component';

describe('AdminAddMenuItemComponent', () => {
  let component: AdminAddMenuItemComponent;
  let fixture: ComponentFixture<AdminAddMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
