import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCheckoutPageComponent } from './view-checkout-page.component';

describe('ViewCheckoutPageComponent', () => {
  let component: ViewCheckoutPageComponent;
  let fixture: ComponentFixture<ViewCheckoutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCheckoutPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCheckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
