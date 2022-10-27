import { TestBed } from '@angular/core/testing';

import { PasajeroGuard } from './pasajero.guard';

describe('PasajeroGuard', () => {
  let guard: PasajeroGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PasajeroGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
