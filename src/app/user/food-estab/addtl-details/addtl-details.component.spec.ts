import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtlDetailsComponent } from './addtl-details.component';

describe('AddtlDetailsComponent', () => {
  let component: AddtlDetailsComponent;
  let fixture: ComponentFixture<AddtlDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtlDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
