import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCompletedComponent } from './checkout-completed.component';

describe('CheckoutCompletedComponent', () => {
  let component: CheckoutCompletedComponent;
  let fixture: ComponentFixture<CheckoutCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
