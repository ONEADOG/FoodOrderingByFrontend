import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittableComponent } from './edittable.component';

describe('EdittableComponent', () => {
  let component: EdittableComponent;
  let fixture: ComponentFixture<EdittableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdittableComponent]
    });
    fixture = TestBed.createComponent(EdittableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
