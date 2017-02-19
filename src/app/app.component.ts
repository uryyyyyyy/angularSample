import { Component } from '@angular/core';
import {CounterService} from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  point: number;

  constructor(private counterService: CounterService) {
    this.point = counterService.point.getValue();
    counterService.point.subscribe((v) => this.point = v);
  }

  increment() {
    this.counterService.increment(3);
  }

  decrement() {
    this.counterService.decrement(2);
  }
}
