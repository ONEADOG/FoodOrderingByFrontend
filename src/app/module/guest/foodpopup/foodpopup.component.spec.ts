import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodpopupComponent } from './foodpopup.component';

describe('FoodpopupComponent', () => {
  let component: FoodpopupComponent;
  let fixture: ComponentFixture<FoodpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodpopupComponent]
    });
    fixture = TestBed.createComponent(FoodpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
