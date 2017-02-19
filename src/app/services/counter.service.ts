import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

export const messageEndPoint = `${environment.host}/api/count`;

@Injectable()
export class CounterService {

  point: BehaviorSubject<number> = new BehaviorSubject(0);

  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  constructor(private http: Http) { }

  increment(num: number): void {
    const current = this.point.getValue();
    this.point.next(current + num);
  }

  decrement(num: number): void {
    const current = this.point.getValue();
    this.point.next(current - num);
  }


  fetchNumber(): Observable<{num: number}> {
    return this.http.get(messageEndPoint, {headers: this.headers})
      .map(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(`response.status is bad: ${res.status}`);
        }
      }).catch(err => this.handleError(err));
  }

  private handleError(error: Response | any): ErrorObservable<string> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    // console.error(errMsg);
    return Observable.throw(errMsg);
  }

  asyncIncrement(): Observable<{num: number}> {
    return this.fetchNumber()
      .do((obj: {num: number}) => this.point.next(this.point.getValue() + obj.num));
  }

}
