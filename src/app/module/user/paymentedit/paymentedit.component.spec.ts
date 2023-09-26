import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenteditComponent } from './paymentedit.component';

describe('PaymenteditComponent', () => {
  let component: PaymenteditComponent;
  let fixture: ComponentFixture<PaymenteditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymenteditComponent]
    });
    fixture = TestBed.createComponent(PaymenteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
