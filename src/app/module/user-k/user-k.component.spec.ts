import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKComponent } from './user-k.component';

describe('UserKComponent', () => {
  let component: UserKComponent;
  let fixture: ComponentFixture<UserKComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserKComponent]
    });
    fixture = TestBed.createComponent(UserKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
