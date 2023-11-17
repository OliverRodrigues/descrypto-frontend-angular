import { TestBed } from '@angular/core/testing';

import { CoinApiServiceService } from './coin-api-service.service';

describe('CoinApiServiceService', () => {
  let service: CoinApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
