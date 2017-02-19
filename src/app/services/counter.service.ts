import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class CounterService {

  point: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  increment(num: number): void {
    const current = this.point.getValue();
    this.point.next(current + num);
  }

  decrement(num: number): void {
    const current = this.point.getValue();
    this.point.next(current - num);
  }

}
