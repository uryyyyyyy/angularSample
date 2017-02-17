import { Component } from '@angular/core';
import {CounterService} from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  point: number;
  loadingCount = 0; // 複数リクエストが来ることがあるのでboolでなくnumber

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

  async asyncIncrement() {
    this.loadingCount ++;
    try{
      await this.counterService.asyncIncrement().toPromise()
    }catch(err){
      console.error(err)
    }finally{
      this.loadingCount --
    }
  }

  isLoading(): boolean {
    return this.loadingCount !== 0;
  }
}
