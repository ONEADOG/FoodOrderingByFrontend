import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintableComponent } from './logintable.component';

describe('LogintableComponent', () => {
  let component: LogintableComponent;
  let fixture: ComponentFixture<LogintableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogintableComponent]
    });
    fixture = TestBed.createComponent(LogintableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
