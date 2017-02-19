import {CounterService} from './counter.service';

describe('CounterService', () => {

  it('increment() should increase point', () => {
    const service = new CounterService();
    service.increment(3);
    expect(service.point.getValue()).toBe(3);
  });
});
