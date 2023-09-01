import { TestBed } from '@angular/core/testing';

import { Option2OrderService } from './option2-order.service';

describe('Option2OrderService', () => {
  let service: Option2OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Option2OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
