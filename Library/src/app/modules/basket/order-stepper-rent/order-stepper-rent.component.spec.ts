import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStepperRentComponent } from './order-stepper-rent.component';

describe('OrderStepperRentComponent', () => {
  let component: OrderStepperRentComponent;
  let fixture: ComponentFixture<OrderStepperRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStepperRentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStepperRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
