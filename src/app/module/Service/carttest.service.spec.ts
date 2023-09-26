import { TestBed } from '@angular/core/testing';

import { CarttestService } from './carttest.service';

describe('CarttestService', () => {
  let service: CarttestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarttestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
