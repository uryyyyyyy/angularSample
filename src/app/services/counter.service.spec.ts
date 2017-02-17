import { TestBed, inject } from '@angular/core/testing';
import { CounterService } from './counter.service';

describe('CounterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterService]
    });
  });

  it('should ...', inject([CounterService], (service: CounterService) => {
    expect(service).toBeTruthy();
  }));
});
