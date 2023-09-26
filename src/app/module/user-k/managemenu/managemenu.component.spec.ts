import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemenuComponent } from './managemenu.component';

describe('ManagemenuComponent', () => {
  let component: ManagemenuComponent;
  let fixture: ComponentFixture<ManagemenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagemenuComponent]
    });
    fixture = TestBed.createComponent(ManagemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
