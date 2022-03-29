import { TestBed } from '@angular/core/testing';

import { ReservaCocheService } from './reserva-coche.service';

describe('ReservaCocheService', () => {
  let service: ReservaCocheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaCocheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
