import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarttestComponent } from './carttest.component';

describe('CarttestComponent', () => {
  let component: CarttestComponent;
  let fixture: ComponentFixture<CarttestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarttestComponent]
    });
    fixture = TestBed.createComponent(CarttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
