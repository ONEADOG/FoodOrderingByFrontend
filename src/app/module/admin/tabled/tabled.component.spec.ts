import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabledComponent } from './tabled.component';

describe('TabledComponent', () => {
  let component: TabledComponent;
  let fixture: ComponentFixture<TabledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabledComponent]
    });
    fixture = TestBed.createComponent(TabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
