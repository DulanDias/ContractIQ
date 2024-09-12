import { TestBed } from '@angular/core/testing';

import { InterrogatorService } from './interrogator.service';

describe('InterrogatorService', () => {
  let service: InterrogatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterrogatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
